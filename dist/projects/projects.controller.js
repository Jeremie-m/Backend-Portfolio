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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const project_dto_1 = require("./dto/project.dto");
const find_projects_dto_1 = require("./dto/find-projects.dto");
let ProjectsController = class ProjectsController {
    findAll(query) {
        return Promise.resolve([]);
    }
    findOne(id) {
        return Promise.resolve(null);
    }
    create(createProjectDto) {
        return Promise.resolve(null);
    }
    update(id, updateProjectDto) {
        return Promise.resolve(null);
    }
    remove(id) {
        return Promise.resolve();
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des projets' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des projets récupérée avec succès',
        type: [project_dto_1.ProjectDto]
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_projects_dto_1.FindProjectsDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un projet par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projet trouvé',
        type: project_dto_1.ProjectDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Projet non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau projet' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Projet créé avec succès',
        type: project_dto_1.ProjectDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un projet' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projet mis à jour avec succès',
        type: project_dto_1.ProjectDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Projet non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un projet' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projet supprimé avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Projet non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)('projects')
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map