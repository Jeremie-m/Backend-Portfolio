import { NotFoundException, BadRequestException } from '@nestjs/common';

/**
 * Exception lancée lorsqu'une compétence n'est pas trouvée
 */
export class SkillNotFoundException extends NotFoundException {
  /**
   * @param id Identifiant de la compétence non trouvée
   */
  constructor(id: string) {
    super(`La compétence avec l'ID ${id} n'a pas été trouvée`);
  }
}

/**
 * Exception lancée lorsqu'une compétence avec le même nom existe déjà
 */
export class SkillAlreadyExistsException extends BadRequestException {
  /**
   * @param name Nom de la compétence qui existe déjà
   */
  constructor(name: string) {
    super(`Une compétence avec le nom "${name}" existe déjà`);
  }
}

/**
 * Exception lancée lorsque les données d'une compétence sont invalides
 */
export class InvalidSkillDataException extends BadRequestException {
  /**
   * @param message Message d'erreur détaillant l'invalidité
   */
  constructor(message: string) {
    super(`Données de compétence invalides: ${message}`);
  }
} 