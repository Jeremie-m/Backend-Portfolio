import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

/**
 * Clé utilisée pour stocker les rôles dans les métadonnées
 */
export const ROLES_KEY = 'roles';

/**
 * Décorateur pour spécifier les rôles requis pour accéder à une route
 * @param roles Liste des rôles autorisés
 * @returns Décorateur à appliquer sur une méthode ou une classe
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles); 