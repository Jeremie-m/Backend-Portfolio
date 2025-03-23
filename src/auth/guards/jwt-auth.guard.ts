import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard pour protéger les routes nécessitant une authentification par JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 