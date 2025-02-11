"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const auth_response_dto_1 = require("./dto/auth-response.dto");
let AuthController = class AuthController {
    login(loginDto) {
        return Promise.resolve({
            access_token: 'token',
            token_type: 'Bearer',
            expires_in: 3600
        });
    }
    logout() {
        return Promise.resolve();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Connexion à l\'application' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Connexion réussie',
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Identifiants invalides'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Déconnexion de l\'application' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Déconnexion réussie'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Non authentifié'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map