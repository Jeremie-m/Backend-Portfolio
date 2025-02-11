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
exports.ProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_project_dto_1 = require("./create-project.dto");
class ProjectDto extends create_project_dto_1.CreateProjectDto {
}
exports.ProjectDto = ProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant unique du projet',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date de création du projet',
        example: '2024-02-11T10:00:00Z'
    }),
    __metadata("design:type", Date)
], ProjectDto.prototype, "created_at", void 0);
//# sourceMappingURL=project.dto.js.map