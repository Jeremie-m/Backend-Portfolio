import { NotFoundException, BadRequestException } from '@nestjs/common';

/**
 * Exception lancée lorsqu'un projet n'est pas trouvé
 */
export class ProjectNotFoundException extends NotFoundException {
  /**
   * @param id Identifiant du projet non trouvé
   */
  constructor(id: string) {
    super(`Le projet avec l'ID ${id} n'a pas été trouvé`);
  }
}

/**
 * Exception lancée lorsqu'un projet avec le même titre existe déjà
 */
export class ProjectAlreadyExistsException extends BadRequestException {
  /**
   * @param title Titre du projet qui existe déjà
   */
  constructor(title: string) {
    super(`Un projet avec le titre "${title}" existe déjà`);
  }
}

/**
 * Exception lancée lorsque les données d'un projet sont invalides
 */
export class InvalidProjectDataException extends BadRequestException {
  /**
   * @param message Message d'erreur détaillant l'invalidité
   */
  constructor(message: string) {
    super(`Données de projet invalides: ${message}`);
  }
} 