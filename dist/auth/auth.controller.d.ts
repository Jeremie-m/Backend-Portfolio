import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthController {
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    logout(): Promise<void>;
}
