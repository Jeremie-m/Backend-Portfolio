import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

/**
 * Service gérant les opérations d'authentification
 */
@Injectable()
export class AuthService {
  /**
   * @param databaseService Service de base de données
   * @param jwtService Service JWT pour créer et gérer les tokens
   */
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {
    // La création de la table et de l'utilisateur admin est gérée dans DatabaseService
  }

  /**
   * Valide les identifiants d'un utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe non hashé
   * @returns Utilisateur si les identifiants sont valides, null sinon
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const db = this.databaseService.getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  /**
   * Authentifie un utilisateur et génère un token JWT
   * @param loginDto Données de connexion
   * @returns Informations du token JWT
   * @throws UnauthorizedException Si les identifiants sont invalides
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 3600 // 1 heure en secondes
    };
  }
} 