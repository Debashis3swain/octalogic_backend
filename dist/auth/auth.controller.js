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
const auth_service_1 = require("./auth.service");
const Joi = require("joi");
const response_dto_1 = require("../common/response.dto");
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional()
});
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(body) {
        const { error } = registerSchema.validate(body);
        if (error) {
            return (0, response_dto_1.createErrorResponse)({
                message: error.details[0].message,
                code: 'VALIDATION_ERROR'
            });
        }
        try {
            const result = await this.authService.register(body);
            return result;
        }
        catch (error) {
            return (0, response_dto_1.createErrorResponse)(error);
        }
    }
    async login(body) {
        const { error } = loginSchema.validate(body);
        if (error) {
            return (0, response_dto_1.createErrorResponse)(error);
        }
        try {
            const user = await this.authService.validateUser(body.email, body.password);
            if (!user) {
                return (0, response_dto_1.createErrorResponse)(new common_1.UnauthorizedException('Invalid credentials'));
            }
            const loginResult = await this.authService.login(user);
            return (0, response_dto_1.createSuccessResponse)(loginResult.data, loginResult.data.id);
        }
        catch (error) {
            return (0, response_dto_1.createErrorResponse)(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map