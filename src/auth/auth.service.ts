import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {
    // Créer la table users si elle n'existe pas
    this.initializeUsersTable();
    // Créer l'utilisateur admin initial
    this.createInitialAdminUser();
  }

  private initializeUsersTable() {
    const db = this.databaseService.getDatabase();
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const db = this.databaseService.getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User;

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600 // 1 heure
    };
  }

  async createInitialAdminUser() {
    const db = this.databaseService.getDatabase();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('Variables d\'environnement ADMIN_EMAIL ou ADMIN_PASSWORD non définies');
      return;
    }

    const adminExists = db.prepare('SELECT 1 FROM users WHERE email = ?').get(adminEmail);

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      db.prepare(`
        INSERT INTO users (email, password, role)
        VALUES (?, ?, ?)
      `).run(adminEmail, hashedPassword, 'admin');
      console.log('Utilisateur admin créé avec succès');
    }
  }
} 