import { ApiProperty } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

/**
 * DTO représentant une compétence
 */
export class SkillDto extends CreateSkillDto {
  /**
   * Identifiant unique de la compétence
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty({
    description: 'Identifiant unique de la compétence',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Date d'ajout de la compétence
   * @example 2024-02-11T10:00:00Z
   */
  @ApiProperty({
    description: 'Date d\'ajout de la compétence',
    example: '2024-02-11T10:00:00Z'
  })
  created_at: Date;
} 