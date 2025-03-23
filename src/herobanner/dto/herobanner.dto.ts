import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour représenter un texte de la Hero Banner
 */
export class HeroBannerDto {
  /**
   * Identifiant unique du texte
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({
    description: 'Identifiant unique du texte',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Texte à afficher dans la Hero Banner
   * @example "Développeur Full-Stack"
   */
  @ApiProperty({
    description: 'Texte à afficher dans la Hero Banner',
    example: 'Développeur Full-Stack'
  })
  text: string;

  /**
   * Indique si le texte est actif et doit être affiché
   * @example true
   */
  @ApiProperty({
    description: 'Indique si le texte est actif et doit être affiché',
    example: true,
    default: true
  })
  isActive: boolean;

  /**
   * Date de création
   * @example "2023-04-22T10:30:00Z"
   */
  @ApiProperty({
    description: 'Date de création',
    example: '2023-04-22T10:30:00Z'
  })
  created_at: string;
} 