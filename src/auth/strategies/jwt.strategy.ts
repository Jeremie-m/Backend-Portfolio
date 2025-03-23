import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Interface représentant la charge utile (payload) du token JWT
 */
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Interface représentant l'utilisateur validé après vérification du token
 */
export interface ValidatedUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Stratégie pour valider les tokens JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @param configService Service de configuration pour accéder aux variables d'environnement
   */
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Valide la charge utile (payload) du token JWT et retourne l'utilisateur
   * @param payload Charge utile décodée du token JWT
   * @returns Utilisateur validé
   * @throws UnauthorizedException Si le token est invalide
   */
  async validate(payload: JwtPayload): Promise<ValidatedUser> {
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException('Token invalide');
    }

    return { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role
    };
  }
} 