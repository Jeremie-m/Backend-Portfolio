import { NotFoundException, BadRequestException } from '@nestjs/common';

export class TechnologyNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`La technologie avec l'ID ${id} n'a pas été trouvée`);
  }
}

export class TechnologyAlreadyExistsException extends BadRequestException {
  constructor(name: string) {
    super(`Une technologie avec le nom "${name}" existe déjà`);
  }
}

export class InvalidTechnologyDataException extends BadRequestException {
  constructor(message: string) {
    super(`Données de technologie invalides: ${message}`);
  }
} 