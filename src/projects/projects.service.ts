import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDto } from './dto/project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';
import { ProjectNotFoundException, ProjectAlreadyExistsException, InvalidProjectDataException } from './exceptions/project.exceptions';

interface ProjectRow {
  id: string;
  title: string;
  description?: string;
  technologies?: string;
  github_link?: string;
  demo_link?: string;
  category?: string;
  image_url?: string;
  created_at: string;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: FindProjectsDto): Promise<{ data: ProjectDto[]; total: number }> {
    const db = this.databaseService.getDatabase();
    const { category, search, limit = 10, page = 1 } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const countQuery = db.prepare(`
      SELECT COUNT(*) as total
      FROM projects
      WHERE ${whereClause}
    `);

    const result = countQuery.get(...params) as { total: number };
    const total = result.total;

    const selectQuery = db.prepare(`
      SELECT *
      FROM projects
      WHERE ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);

    const projects = selectQuery.all(...params, limit, offset) as ProjectRow[];

    return {
      data: projects.map(this.mapToProjectDto),
      total
    };
  }

  async findOne(id: string): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectRow;

    if (!project) {
      throw new ProjectNotFoundException(id);
    }

    return this.mapToProjectDto(project);
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si un projet avec le même titre existe déjà
    const existingProject = db.prepare('SELECT 1 FROM projects WHERE title = ?').get(createProjectDto.title);
    if (existingProject) {
      throw new ProjectAlreadyExistsException(createProjectDto.title);
    }

    try {
      // Créer la requête d'insertion qui retourne l'ID généré
      const insertQuery = db.prepare(`
        INSERT INTO projects (title, description, technologies, github_link, demo_link, category, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING id
      `);

      const { id } = insertQuery.get(
        createProjectDto.title,
        createProjectDto.description,
        createProjectDto.technologies,
        createProjectDto.github_link,
        createProjectDto.demo_link,
        createProjectDto.category,
        createProjectDto.image_url
      ) as { id: string };

      // Récupérer le projet créé avec son ID
      return this.findOne(id);
    } catch (error) {
      throw new InvalidProjectDataException(error.message);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si le projet existe
    await this.findOne(id);

    // Vérifier si le nouveau titre n'est pas déjà utilisé par un autre projet
    if (updateProjectDto.title) {
      const existingProject = db.prepare('SELECT 1 FROM projects WHERE title = ? AND id != ?')
        .get(updateProjectDto.title, id);
      if (existingProject) {
        throw new ProjectAlreadyExistsException(updateProjectDto.title);
      }
    }

    // Construire la requête de mise à jour dynamiquement
    const updates = [];
    const values = [];
    Object.entries(updateProjectDto).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return this.findOne(id);
    }

    try {
      values.push(id);
      db.prepare(`
        UPDATE projects
        SET ${updates.join(', ')}
        WHERE id = ?
      `).run(...values);

      return this.findOne(id);
    } catch (error) {
      throw new InvalidProjectDataException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si le projet existe
    await this.findOne(id);

    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  }

  private mapToProjectDto(project: ProjectRow): ProjectDto {
    return {
      ...project,
      created_at: new Date(project.created_at)
    };
  }
} 