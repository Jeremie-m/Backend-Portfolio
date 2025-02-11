import { ApiProperty } from '@nestjs/swagger';
import { CreateTechnologyDto } from './create-technology.dto';

export class TechnologyDto extends CreateTechnologyDto {
  @ApiProperty({
    description: 'Identifiant unique de la technologie',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Date d\'ajout de la technologie',
    example: '2024-02-11T10:00:00Z'
  })
  created_at: Date;
} 