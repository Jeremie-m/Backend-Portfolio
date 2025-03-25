import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';

/**
 * Interface pour les données brutes d'un projet en base de données
 */
interface ProjectEntity {
  id: string;
  order: number;
  title: string;
  description: string;
  skills: string;
  github_link: string | null;
  demo_link: string | null;
  image_url: string | null;
  created_at: string;
}

/**
 * Interface pour les résultats paginés
 */
interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Service gérant les opérations CRUD sur les projets
 */
@Injectable()
export class ProjectsService {
  /**
   * @param databaseService Service d'accès à la base de données
   */
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Récupère une liste paginée de projets avec options de filtrage
   * @param query Paramètres de recherche et pagination
   * @returns Liste paginée de projets
   */
  findAll(query: FindProjectsDto): PaginatedResult<ProjectDto> {
    const db = this.databaseService.getDatabase();
    const limit = query.limit || 100;
    const page = query.page || 10;
    const offset = (page - 1) * limit;

    let sqlQuery = 'SELECT * FROM projects';
    let countQuery = 'SELECT COUNT(*) as count FROM projects';
    const params: any[] = [];

    if (query.search) {
      sqlQuery += ' WHERE (title LIKE ? OR description LIKE ?)';
      countQuery += ' WHERE (title LIKE ? OR description LIKE ?)';
      params.push(`%${query.search}%`, `%${query.search}%`);
    }

    // Ajout du tri par ordre
    sqlQuery += ' ORDER BY "order" ASC';
    sqlQuery += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const projects = db.prepare(sqlQuery).all(...params) as ProjectEntity[];
    const count = (db.prepare(countQuery).get(...params.slice(0, -2)) as { count: number }).count;

    return {
      items: projects.map(project => this.mapEntityToDto(project)),
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  }

  /**
   * Récupère un projet par son identifiant
   * @param id Identifiant du projet
   * @returns Projet trouvé
   * @throws ProjectNotFoundException si le projet n'existe pas
   */
  findOne(id: string): ProjectDto {
    const db = this.databaseService.getDatabase();
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectEntity;

    if (!project) {
      throw new NotFoundException(`Le projet avec l'ID ${id} n'existe pas`);
    }

    return this.mapEntityToDto(project);
  }

  /**
   * Crée un nouveau projet
   * @param createProjectDto Données du projet à créer
   * @returns Projet créé
   * @throws ProjectAlreadyExistsException si un projet avec le même titre existe déjà
   */
  create(createProjectDto: CreateProjectDto): ProjectDto {
    const db = this.databaseService.getDatabase();

    // Vérifier si le titre existe déjà
    const existingProject = db.prepare('SELECT id FROM projects WHERE title = ?').get(createProjectDto.title);
    if (existingProject) {
      throw new ConflictException(`Un projet avec le titre "${createProjectDto.title}" existe déjà`);
    }

    // Trouver la valeur maximale d'order
    const maxOrder = db.prepare('SELECT MAX("order") as maxOrder FROM projects').get() as { maxOrder: number | null };
    const newOrder = (maxOrder.maxOrder || 0) + 1;

    const project: Omit<ProjectEntity, 'created_at'> = {
      id: (db.prepare('SELECT uuid() as id').get() as { id: string }).id,
      order: newOrder,
      title: createProjectDto.title,
      description: createProjectDto.description,
      skills: JSON.stringify(createProjectDto.skills || []),
      github_link: createProjectDto.github_link || null,
      demo_link: createProjectDto.demo_link || null,
      image_url: createProjectDto.image_url || null
    };

    db.prepare(`
      INSERT INTO projects (id, "order", title, description, skills, github_link, demo_link, image_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `).run(
      project.id,
      project.order,
      project.title,
      project.description,
      project.skills,
      project.github_link,
      project.demo_link,
      project.image_url
    );

    return this.findOne(project.id);
  }

  /**
   * Met à jour un projet existant
   * @param id Identifiant du projet à mettre à jour
   * @param updateProjectDto Données à mettre à jour
   * @returns Projet mis à jour
   * @throws ProjectNotFoundException si le projet n'existe pas
   * @throws ProjectAlreadyExistsException si un autre projet utilise déjà le titre fourni
   */
  update(id: string, updateProjectDto: UpdateProjectDto): ProjectDto {
    const db = this.databaseService.getDatabase();
    const existingProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectEntity;

    if (!existingProject) {
      throw new NotFoundException(`Le projet avec l'ID ${id} n'existe pas`);
    }

    if (updateProjectDto.title) {
      const titleExists = db.prepare('SELECT id FROM projects WHERE title = ? AND id != ?').get(updateProjectDto.title, id);
      if (titleExists) {
        throw new ConflictException(`Un projet avec le titre "${updateProjectDto.title}" existe déjà`);
      }
    }

    // Gérer le changement d'ordre si nécessaire
    if (updateProjectDto.order && updateProjectDto.order !== existingProject.order) {
      if (updateProjectDto.order > existingProject.order) {
        // Déplacer vers le bas : décrémente les ordres entre l'ancien et le nouveau
        db.prepare('UPDATE projects SET "order" = "order" - 1 WHERE "order" > ? AND "order" <= ?')
          .run(existingProject.order, updateProjectDto.order);
      } else {
        // Déplacer vers le haut : incrémente les ordres entre le nouveau et l'ancien
        db.prepare('UPDATE projects SET "order" = "order" + 1 WHERE "order" >= ? AND "order" < ?')
          .run(updateProjectDto.order, existingProject.order);
      }
    }

    const updatedProject: ProjectEntity = {
      ...existingProject,
      order: updateProjectDto.order ?? existingProject.order,
      title: updateProjectDto.title ?? existingProject.title,
      description: updateProjectDto.description ?? existingProject.description,
      skills: updateProjectDto.skills ? JSON.stringify(updateProjectDto.skills) : existingProject.skills,
      github_link: updateProjectDto.github_link ?? existingProject.github_link,
      demo_link: updateProjectDto.demo_link ?? existingProject.demo_link,
      image_url: updateProjectDto.image_url ?? existingProject.image_url
    };

    db.prepare(`
      UPDATE projects
      SET "order" = ?, title = ?, description = ?, skills = ?, github_link = ?, demo_link = ?, image_url = ?
      WHERE id = ?
    `).run(
      updatedProject.order,
      updatedProject.title,
      updatedProject.description,
      updatedProject.skills,
      updatedProject.github_link,
      updatedProject.demo_link,
      updatedProject.image_url,
      id
    );

    return this.mapEntityToDto(updatedProject);
  }

  /**
   * Supprime un projet
   * @param id Identifiant du projet à supprimer
   * @returns Projet supprimé
   * @throws ProjectNotFoundException si le projet n'existe pas
   */
  remove(id: string): void {
    const db = this.databaseService.getDatabase();
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectEntity;

    if (!project) {
      throw new NotFoundException(`Le projet avec l'ID ${id} n'existe pas`);
    }

    // Supprimer le projet
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);

    // Réorganiser les ordres des projets restants
    db.prepare('UPDATE projects SET "order" = "order" - 1 WHERE "order" > ?').run(project.order);
  }

  /**
   * Convertit une entité de base de données en DTO
   * @param entity Données brutes du projet
   * @returns DTO du projet
   */
  private mapEntityToDto(entity: ProjectEntity): ProjectDto {
    return {
      id: entity.id,
      order: entity.order,
      title: entity.title,
      description: entity.description,
      skills: JSON.parse(entity.skills),
      github_link: entity.github_link,
      demo_link: entity.demo_link,
      image_url: entity.image_url,
      created_at: entity.created_at
    };
  }
} 