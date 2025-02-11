import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
import {
  PostNotFoundException,
  PostAlreadyExistsException,
  InvalidPostDataException,
  TagNotFoundException,
  TagAlreadyExistsException,
} from './exceptions/blog.exceptions';

interface PostRow {
  id: string;
  title: string;
  content: string;
  publication_date: string;
  meta_description?: string;
  image_url?: string;
}

interface TagRow {
  id: string;
  name: string;
  created_at: string;
}

@Injectable()
export class BlogService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: FindPostsDto): Promise<{ data: PostDto[]; total: number }> {
    const db = this.databaseService.getDatabase();
    const { search, tags, limit = 10, page = 1 } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (search) {
      whereClause += ' AND (p.title LIKE ? OR p.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    let tagJoinClause = '';
    if (tags && tags.length > 0) {
      tagJoinClause = `
        INNER JOIN post_tags pt ON p.id = pt.post_id
        INNER JOIN tags t ON pt.tag_id = t.id
        WHERE t.name IN (${tags.map(() => '?').join(',')})
      `;
      params.push(...tags);
    }

    const countQuery = db.prepare(`
      SELECT COUNT(DISTINCT p.id) as total
      FROM blog_posts p
      ${tagJoinClause}
      WHERE ${whereClause}
    `);

    const result = countQuery.get(...params) as { total: number };
    const total = result.total;

    const selectQuery = db.prepare(`
      SELECT DISTINCT p.*, GROUP_CONCAT(t.name) as tags
      FROM blog_posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      ${tagJoinClause}
      WHERE ${whereClause}
      GROUP BY p.id
      ORDER BY p.publication_date DESC
      LIMIT ? OFFSET ?
    `);

    const posts = selectQuery.all(...params, limit, offset) as (PostRow & { tags: string })[];

    return {
      data: posts.map(post => this.mapToPostDto(post)),
      total
    };
  }

  async findOne(id: string): Promise<PostDto> {
    const db = this.databaseService.getDatabase();
    
    const query = db.prepare(`
      SELECT p.*, GROUP_CONCAT(t.name) as tags
      FROM blog_posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.id = ?
      GROUP BY p.id
    `);

    const post = query.get(id) as (PostRow & { tags: string });

    if (!post) {
      throw new PostNotFoundException(id);
    }

    return this.mapToPostDto(post);
  }

  async create(createPostDto: CreatePostDto): Promise<PostDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si un article avec le même titre existe déjà
    const existingPost = db.prepare('SELECT 1 FROM blog_posts WHERE title = ?').get(createPostDto.title);
    if (existingPost) {
      throw new PostAlreadyExistsException(createPostDto.title);
    }

    try {
      // Commencer une transaction
      db.exec('BEGIN TRANSACTION');

      // Insérer l'article
      const insertPostQuery = db.prepare(`
        INSERT INTO blog_posts (title, content, meta_description, image_url)
        VALUES (?, ?, ?, ?)
        RETURNING id
      `);

      const { id } = insertPostQuery.get(
        createPostDto.title,
        createPostDto.content,
        createPostDto.meta_description,
        createPostDto.image_url
      ) as { id: string };

      // Gérer les tags
      if (createPostDto.tags && createPostDto.tags.length > 0) {
        await this.handleTags(db, id, createPostDto.tags);
      }

      // Valider la transaction
      db.exec('COMMIT');

      return this.findOne(id);
    } catch (error) {
      // Annuler la transaction en cas d'erreur
      db.exec('ROLLBACK');
      throw new InvalidPostDataException(error.message);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si l'article existe
    await this.findOne(id);

    // Vérifier si le nouveau titre n'est pas déjà utilisé
    if (updatePostDto.title) {
      const existingPost = db.prepare('SELECT 1 FROM blog_posts WHERE title = ? AND id != ?')
        .get(updatePostDto.title, id);
      if (existingPost) {
        throw new PostAlreadyExistsException(updatePostDto.title);
      }
    }

    try {
      // Commencer une transaction
      db.exec('BEGIN TRANSACTION');

      // Construire la requête de mise à jour
      const updates = [];
      const values = [];
      const fields = ['title', 'content', 'meta_description', 'image_url'];
      
      fields.forEach(field => {
        const value = updatePostDto[field];
        if (value !== undefined) {
          updates.push(`${field} = ?`);
          values.push(value);
        }
      });

      if (updates.length > 0) {
        values.push(id);
        db.prepare(`
          UPDATE blog_posts
          SET ${updates.join(', ')}
          WHERE id = ?
        `).run(...values);
      }

      // Mettre à jour les tags si nécessaire
      if (updatePostDto.tags !== undefined) {
        // Supprimer les anciennes relations
        db.prepare('DELETE FROM post_tags WHERE post_id = ?').run(id);
        
        // Ajouter les nouveaux tags
        if (updatePostDto.tags && updatePostDto.tags.length > 0) {
          await this.handleTags(db, id, updatePostDto.tags);
        }
      }

      // Valider la transaction
      db.exec('COMMIT');

      return this.findOne(id);
    } catch (error) {
      // Annuler la transaction en cas d'erreur
      db.exec('ROLLBACK');
      throw new InvalidPostDataException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si l'article existe
    await this.findOne(id);

    try {
      // Commencer une transaction
      db.exec('BEGIN TRANSACTION');

      // Supprimer les relations avec les tags
      db.prepare('DELETE FROM post_tags WHERE post_id = ?').run(id);

      // Supprimer l'article
      db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);

      // Valider la transaction
      db.exec('COMMIT');
    } catch (error) {
      // Annuler la transaction en cas d'erreur
      db.exec('ROLLBACK');
      throw new InvalidPostDataException(error.message);
    }
  }

  private async handleTags(db: any, postId: string, tagNames: string[]): Promise<void> {
    const insertTagQuery = db.prepare(`
      INSERT OR IGNORE INTO tags (name)
      VALUES (?)
      RETURNING id
    `);

    const getTagQuery = db.prepare('SELECT id FROM tags WHERE name = ?');
    const linkTagQuery = db.prepare('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)');

    for (const tagName of tagNames) {
      // Essayer de récupérer le tag existant ou en créer un nouveau
      let tagId = getTagQuery.get(tagName)?.id;
      if (!tagId) {
        const result = insertTagQuery.get(tagName);
        tagId = result?.id;
      }

      if (tagId) {
        // Lier le tag à l'article
        linkTagQuery.run(postId, tagId);
      }
    }
  }

  private mapToPostDto(post: PostRow & { tags: string }): PostDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      publication_date: new Date(post.publication_date),
      meta_description: post.meta_description,
      image_url: post.image_url,
      tags: post.tags ? post.tags.split(',').filter(Boolean) : []
    };
  }
} 