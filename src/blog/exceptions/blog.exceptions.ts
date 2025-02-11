import { NotFoundException, BadRequestException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`L'article avec l'ID ${id} n'a pas été trouvé`);
  }
}

export class PostAlreadyExistsException extends BadRequestException {
  constructor(title: string) {
    super(`Un article avec le titre "${title}" existe déjà`);
  }
}

export class InvalidPostDataException extends BadRequestException {
  constructor(message: string) {
    super(`Données d'article invalides: ${message}`);
  }
}

export class TagNotFoundException extends NotFoundException {
  constructor(name: string) {
    super(`Le tag "${name}" n'a pas été trouvé`);
  }
}

export class TagAlreadyExistsException extends BadRequestException {
  constructor(name: string) {
    super(`Le tag "${name}" existe déjà`);
  }
} 