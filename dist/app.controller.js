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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getRoot() {
        return {
            name: 'Portfolio API',
            version: '1.0.0',
            description: 'API pour le portfolio personnel',
            documentation: '/docs',
            endpoints: {
                projects: '/api/projects',
                blog: '/api/blog',
                technologies: '/api/technologies'
            }
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Page d\'accueil' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Informations sur l\'API et ses endpoints',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Portfolio API' },
                version: { type: 'string', example: '1.0.0' },
                description: { type: 'string' },
                documentation: { type: 'string' },
                endpoints: {
                    type: 'object',
                    properties: {
                        projects: { type: 'string' },
                        blog: { type: 'string' },
                        technologies: { type: 'string' }
                    }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoot", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Default'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map