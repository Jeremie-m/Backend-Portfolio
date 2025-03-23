import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

/**
 * Guard pour vérifier si l'utilisateur possède les rôles requis pour accéder à une route
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @param reflector Service pour accéder aux métadonnées
   */
  constructor(private reflector: Reflector) {}

  /**
   * Vérifie si l'utilisateur actuel a les rôles requis pour accéder à la route
   * @param context Contexte d'exécution de la requête
   * @returns true si l'accès est autorisé, false sinon
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles) {
      return true; // Pas de rôle requis, accès autorisé
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
} 