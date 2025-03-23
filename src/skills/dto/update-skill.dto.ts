import { PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

/**
 * DTO pour la mise à jour d'une compétence existante
 * Tous les champs sont optionnels
 */
export class UpdateSkillDto extends PartialType(CreateSkillDto) {} 