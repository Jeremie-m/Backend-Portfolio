import { NotFoundException, BadRequestException } from '@nestjs/common';

export class ProjectNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Le projet avec l'ID ${id} n'a pas été trouvé`);
  }
}

export class ProjectAlreadyExistsException extends BadRequestException {
  constructor(title: string) {
    super(`Un projet avec le titre "${title}" existe déjà`);
  }
}

export class InvalidProjectDataException extends BadRequestException {
  constructor(message: string) {
    super(`Données de projet invalides: ${message}`);
  }
} 