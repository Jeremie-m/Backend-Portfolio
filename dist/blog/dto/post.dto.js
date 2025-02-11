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
exports.PostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PostDto {
}
exports.PostDto = PostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant unique de l\'article',
        example: '1'
    }),
    __metadata("design:type", String)
], PostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Titre de l\'article',
        example: 'Mon premier article de blog'
    }),
    __metadata("design:type", String)
], PostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contenu de l\'article',
        example: 'Ceci est le contenu de mon premier article...'
    }),
    __metadata("design:type", String)
], PostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date de création de l\'article',
        example: '2024-03-15T10:30:00Z'
    }),
    __metadata("design:type", Date)
], PostDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date de dernière modification de l\'article',
        example: '2024-03-15T10:30:00Z'
    }),
    __metadata("design:type", Date)
], PostDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image de couverture de l\'article',
        example: 'https://example.com/image.jpg',
        required: false
    }),
    __metadata("design:type", String)
], PostDto.prototype, "coverImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associés à l\'article',
        example: ['développement', 'javascript', 'nestjs'],
        required: false,
        type: [String]
    }),
    __metadata("design:type", Array)
], PostDto.prototype, "tags", void 0);
//# sourceMappingURL=post.dto.js.map