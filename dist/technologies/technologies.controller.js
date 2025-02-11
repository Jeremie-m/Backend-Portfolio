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
exports.TechnologiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_technology_dto_1 = require("./dto/create-technology.dto");
const update_technology_dto_1 = require("./dto/update-technology.dto");
const technology_dto_1 = require("./dto/technology.dto");
const find_technologies_dto_1 = require("./dto/find-technologies.dto");
let TechnologiesController = class TechnologiesController {
    findAll(query) {
        return Promise.resolve([]);
    }
    findOne(id) {
        return Promise.resolve(null);
    }
    create(createTechnologyDto) {
        return Promise.resolve(null);
    }
    update(id, updateTechnologyDto) {
        return Promise.resolve(null);
    }
    remove(id) {
        return Promise.resolve();
    }
};
exports.TechnologiesController = TechnologiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des technologies' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des technologies récupérée avec succès',
        type: [technology_dto_1.TechnologyDto]
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_technologies_dto_1.FindTechnologiesDto]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une technologie par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technologie trouvée',
        type: technology_dto_1.TechnologyDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Technologie non trouvée'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle technologie' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Technologie créée avec succès',
        type: technology_dto_1.TechnologyDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_technology_dto_1.CreateTechnologyDto]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une technologie' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technologie mise à jour avec succès',
        type: technology_dto_1.TechnologyDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Technologie non trouvée'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_technology_dto_1.UpdateTechnologyDto]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une technologie' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technologie supprimée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Technologie non trouvée'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TechnologiesController.prototype, "remove", null);
exports.TechnologiesController = TechnologiesController = __decorate([
    (0, swagger_1.ApiTags)('Technologies'),
    (0, common_1.Controller)('technologies')
], TechnologiesController);
//# sourceMappingURL=technologies.controller.js.map