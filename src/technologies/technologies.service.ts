import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { TechnologyDto } from './dto/technology.dto';
import { FindTechnologiesDto } from './dto/find-technologies.dto';
import { 
  TechnologyNotFoundException, 
  TechnologyAlreadyExistsException, 
  InvalidTechnologyDataException 
} from './exceptions/technology.exceptions';

interface TechnologyRow {
  id: string;
  name: string;
  category?: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

@Injectable()
export class TechnologiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: FindTechnologiesDto): Promise<{ data: TechnologyDto[]; total: number }> {
    const db = this.databaseService.getDatabase();
    const { category, search, limit = 10, page = 1, sort = 'asc' } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const countQuery = db.prepare(`
      SELECT COUNT(*) as total
      FROM technologies
      WHERE ${whereClause}
    `);

    const result = countQuery.get(...params) as { total: number };
    const total = result.total;

    const selectQuery = db.prepare(`
      SELECT *
      FROM technologies
      WHERE ${whereClause}
      ORDER BY name ${sort === 'desc' ? 'DESC' : 'ASC'}
      LIMIT ? OFFSET ?
    `);

    const technologies = selectQuery.all(...params, limit, offset) as TechnologyRow[];

    return {
      data: technologies.map(this.mapToTechnologyDto),
      total
    };
  }

  async findOne(id: string): Promise<TechnologyDto> {
    const db = this.databaseService.getDatabase();
    const technology = db.prepare('SELECT * FROM technologies WHERE id = ?').get(id) as TechnologyRow;

    if (!technology) {
      throw new TechnologyNotFoundException(id);
    }

    return this.mapToTechnologyDto(technology);
  }

  async create(createTechnologyDto: CreateTechnologyDto): Promise<TechnologyDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si une technologie avec le même nom existe déjà
    const existingTechnology = db.prepare('SELECT 1 FROM technologies WHERE name = ?').get(createTechnologyDto.name);
    if (existingTechnology) {
      throw new TechnologyAlreadyExistsException(createTechnologyDto.name);
    }

    try {
      const insertQuery = db.prepare(`
        INSERT INTO technologies (name, category, description, image_url)
        VALUES (?, ?, ?, ?)
        RETURNING id
      `);

      const { id } = insertQuery.get(
        createTechnologyDto.name,
        createTechnologyDto.category,
        createTechnologyDto.description,
        createTechnologyDto.image_url
      ) as { id: string };

      return this.findOne(id);
    } catch (error) {
      throw new InvalidTechnologyDataException(error.message);
    }
  }

  async update(id: string, updateTechnologyDto: UpdateTechnologyDto): Promise<TechnologyDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si la technologie existe
    await this.findOne(id);

    // Vérifier si le nouveau nom n'est pas déjà utilisé par une autre technologie
    if (updateTechnologyDto.name) {
      const existingTechnology = db.prepare('SELECT 1 FROM technologies WHERE name = ? AND id != ?')
        .get(updateTechnologyDto.name, id);
      if (existingTechnology) {
        throw new TechnologyAlreadyExistsException(updateTechnologyDto.name);
      }
    }

    // Construire la requête de mise à jour dynamiquement
    const updates = [];
    const values = [];
    Object.entries(updateTechnologyDto).forEach(([key, value]) => {
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
        UPDATE technologies
        SET ${updates.join(', ')}
        WHERE id = ?
      `).run(...values);

      return this.findOne(id);
    } catch (error) {
      throw new InvalidTechnologyDataException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si la technologie existe
    await this.findOne(id);

    db.prepare('DELETE FROM technologies WHERE id = ?').run(id);
  }

  private mapToTechnologyDto(technology: TechnologyRow): TechnologyDto {
    return {
      ...technology,
      created_at: new Date(technology.created_at)
    };
  }
} 