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
exports.FindPostsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindPostsDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.FindPostsDto = FindPostsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Terme de recherche pour filtrer les articles',
        required: false,
        example: 'javascript'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindPostsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags pour filtrer les articles',
        required: false,
        type: [String],
        example: ['développement', 'javascript']
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FindPostsDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Numéro de la page',
        required: false,
        minimum: 1,
        default: 1,
        example: 1
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindPostsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre d\'articles par page',
        required: false,
        minimum: 1,
        maximum: 50,
        default: 10,
        example: 10
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindPostsDto.prototype, "limit", void 0);
//# sourceMappingURL=find-posts.dto.js.map