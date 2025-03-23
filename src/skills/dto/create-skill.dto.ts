import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

/**
 * DTO pour la création d'une nouvelle compétence
 */
export class CreateSkillDto {
  /**
   * Nom de la compétence
   * @example React
   */
  @ApiProperty({
    description: 'Nom de la compétence',
    example: 'React'
  })
  @IsString()
  name: string;

  /**
   * Catégorie de la compétence
   * @example Frontend Framework
   */
  @ApiProperty({
    description: 'Catégorie de la compétence',
    example: 'Frontend Framework',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * Description de la compétence
   * @example Une bibliothèque JavaScript pour créer des interfaces utilisateurs
   */
  @ApiProperty({
    description: 'Description de la compétence',
    example: 'Une bibliothèque JavaScript pour créer des interfaces utilisateurs',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * URL de l'icône ou logo de la compétence
   * @example https://example.com/react-logo.png
   */
  @ApiProperty({
    description: 'URL de l\'icône ou logo de la compétence',
    example: 'https://example.com/react-logo.png',
    required: false
  })
  @IsUrl()
  @IsOptional()
  image_url?: string;
} 