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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const post_dto_1 = require("./dto/post.dto");
const find_posts_dto_1 = require("./dto/find-posts.dto");
let BlogController = class BlogController {
    findAll(query) {
        return Promise.resolve([]);
    }
    findOne(id) {
        return Promise.resolve(null);
    }
    create(createPostDto) {
        return Promise.resolve(null);
    }
    update(id, updatePostDto) {
        return Promise.resolve(null);
    }
    remove(id) {
        return Promise.resolve();
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des articles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des articles récupérée avec succès',
        type: [post_dto_1.PostDto]
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_posts_dto_1.FindPostsDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un article par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article trouvé',
        type: post_dto_1.PostDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel article' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Article créé avec succès',
        type: post_dto_1.PostDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un article' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article mis à jour avec succès',
        type: post_dto_1.PostDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un article' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article supprimé avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "remove", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)('Blog'),
    (0, common_1.Controller)('blog')
], BlogController);
//# sourceMappingURL=blog.controller.js.map