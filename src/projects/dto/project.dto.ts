import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class ProjectDto extends CreateProjectDto {
  @ApiProperty({
    description: 'Identifiant unique du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Date de création du projet',
    example: '2024-02-11T10:00:00Z'
  })
  created_at: Date;
} 