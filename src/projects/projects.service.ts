import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';
import { 
  ProjectNotFoundException, 
  ProjectAlreadyExistsException, 
  InvalidProjectDataException 
} from './exceptions/project.exceptions';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';

/**
 * Interface pour les données brutes d'un projet en base de données
 */
interface ProjectEntity {
  id: string;
  title: string;
  description: string | null;
  skills: string | null;
  github_link: string | null;
  demo_link: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string;
}

/**
 * Interface pour les résultats paginés
 */
interface PaginatedResult<T> {
  data: T[];
  total: number;
}

/**
 * Service gérant les opérations CRUD sur les projets
 */
@Injectable()
export class ProjectsService {
  /**
   * @param databaseService Service d'accès à la base de données
   */
  constructor(private databaseService: DatabaseService) {}

  /**
   * Récupère une liste paginée de projets avec options de filtrage
   * @param query Paramètres de recherche et pagination
   * @returns Liste paginée de projets
   */
  async findAll(query: FindProjectsDto): Promise<PaginatedResult<ProjectDto>> {
    const db = this.databaseService.getDatabase();
    const { search, limit = 20, page = 1, sort = 'asc' } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

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
      ORDER BY created_at ${sort === 'desc' ? 'DESC' : 'ASC'}
      LIMIT ? OFFSET ?
    `);

    const projects = selectQuery.all(...params, limit, offset) as ProjectEntity[];

    return {
      data: projects.map(project => this.mapToProjectDto(project)),
      total
    };
  }

  /**
   * Récupère un projet par son identifiant
   * @param id Identifiant du projet
   * @returns Projet trouvé
   * @throws ProjectNotFoundException si le projet n'existe pas
   */
  async findOne(id: string): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectEntity | undefined;
    
    if (!project) {
      throw new ProjectNotFoundException(id);
    }
    
    return this.mapToProjectDto(project);
  }

  /**
   * Crée un nouveau projet
   * @param createProjectDto Données du projet à créer
   * @returns Projet créé
   * @throws ProjectAlreadyExistsException si un projet avec le même titre existe déjà
   */
  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si un projet avec le même titre existe déjà
    const existingProject = db.prepare('SELECT id FROM projects WHERE title = ?').get(createProjectDto.title);
    
    if (existingProject) {
      throw new ProjectAlreadyExistsException(createProjectDto.title);
    }
    
    // Préparer les données pour l'insertion
    const projectData = {
      id: crypto.randomUUID(),
      title: createProjectDto.title,
      description: createProjectDto.description || null,
      // Convertir le tableau de compétences en chaîne de caractères pour le stockage
      skills: createProjectDto.skills && createProjectDto.skills.length > 0 
        ? createProjectDto.skills.join(',') 
        : null,
      github_link: createProjectDto.github_link || null,
      demo_link: createProjectDto.demo_link || null,
      category: createProjectDto.category || null,
      image_url: createProjectDto.image_url || null,
      created_at: new Date().toISOString()
    };
    
    try {
      const insert = db.prepare(`
        INSERT INTO projects (id, title, description, skills, github_link, demo_link, category, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      insert.run(
        projectData.id,
        projectData.title,
        projectData.description,
        projectData.skills,
        projectData.github_link,
        projectData.demo_link,
        projectData.category,
        projectData.image_url,
        projectData.created_at
      );
      
      return this.findOne(projectData.id);
    } catch (error) {
      throw new InvalidProjectDataException(error.message);
    }
  }

  /**
   * Met à jour un projet existant
   * @param id Identifiant du projet à mettre à jour
   * @param updateProjectDto Données à mettre à jour
   * @returns Projet mis à jour
   * @throws ProjectNotFoundException si le projet n'existe pas
   * @throws ProjectAlreadyExistsException si un autre projet utilise déjà le titre fourni
   */
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si le projet existe
    const existingProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectEntity | undefined;
    
    if (!existingProject) {
      throw new ProjectNotFoundException(id);
    }
    
    // Si le titre change, vérifier qu'il n'est pas déjà utilisé
    if (updateProjectDto.title && updateProjectDto.title !== existingProject.title) {
      const titleExists = db.prepare('SELECT id FROM projects WHERE title = ? AND id != ?').get(updateProjectDto.title, id);
      
      if (titleExists) {
        throw new ProjectAlreadyExistsException(updateProjectDto.title);
      }
    }
    
    // Préparer les données de mise à jour
    const updateData: Record<string, any> = { ...updateProjectDto };
    
    // Convertir le tableau de compétences en chaîne de caractères si présent
    if (updateData.skills && Array.isArray(updateData.skills)) {
      updateData.skills = updateData.skills.length > 0 ? updateData.skills.join(',') : null;
    }
    
    // Construire la requête de mise à jour
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }
    
    if (updateFields.length === 0) {
      return this.findOne(id);
    }
    
    // Ajouter l'ID à la fin des valeurs pour la clause WHERE
    updateValues.push(id);
    
    try {
      const updateQuery = db.prepare(`
        UPDATE projects
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `);
      
      updateQuery.run(...updateValues);
      
      return this.findOne(id);
    } catch (error) {
      throw new InvalidProjectDataException(error.message);
    }
  }

  /**
   * Supprime un projet
   * @param id Identifiant du projet à supprimer
   * @returns Projet supprimé
   * @throws ProjectNotFoundException si le projet n'existe pas
   */
  async remove(id: string): Promise<ProjectDto> {
    const db = this.databaseService.getDatabase();
    const project = await this.findOne(id);
    
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    
    return project;
  }

  /**
   * Convertit les données brutes de la base de données en DTO
   * @param project Données brutes du projet
   * @returns DTO du projet
   */
  private mapToProjectDto(project: ProjectEntity): ProjectDto {
    const dto = { ...project } as unknown as ProjectDto;
    
    // Convertir la chaîne de compétences en tableau
    dto.skills = project.skills ? project.skills.split(',').map(skill => skill.trim()) : [];
    
    return dto;
  }
} 