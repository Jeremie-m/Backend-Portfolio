import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception lancée lorsqu'un texte de Hero Banner n'est pas trouvé
 */
export class HeroBannerNotFoundException extends HttpException {
  constructor(id?: string) {
    super(
      id
        ? `Le texte de Hero Banner avec l'ID "${id}" n'a pas été trouvé`
        : 'Texte de Hero Banner non trouvé',
      HttpStatus.NOT_FOUND
    );
  }
}

/**
 * Exception lancée lorsqu'un texte de Hero Banner existe déjà
 */
export class HeroBannerAlreadyExistsException extends HttpException {
  constructor(text: string) {
    super(
      `Un texte de Hero Banner avec le contenu "${text}" existe déjà`,
      HttpStatus.BAD_REQUEST
    );
  }
}

/**
 * Exception lancée lorsque les données d'un texte de Hero Banner sont invalides
 */
export class InvalidHeroBannerDataException extends HttpException {
  constructor(message = 'Données de texte de Hero Banner invalides') {
    super(message, HttpStatus.BAD_REQUEST);
  }
} 