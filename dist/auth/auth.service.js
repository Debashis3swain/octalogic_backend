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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const response_dto_1 = require("../common/response.dto");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (user && await bcrypt.compare(pass, user.password)) {
                const { password } = user, result = __rest(user, ["password"]);
                return (0, response_dto_1.createSuccessResponse)(result, user.id);
            }
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        catch (error) {
            return (0, response_dto_1.createErrorResponse)(error);
        }
    }
    async login(user) {
        try {
            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
                expiresIn: process.env.JWT_EXPIRES_IN || '3600s'
            });
            const userData = await this.usersService.findById(user.id);
            if (!userData) {
                throw new Error('User not found');
            }
            const responseData = {
                id: userData.id,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                token: token,
                created_at: userData.created_at,
                updated_at: userData.updated_at
            };
            return (0, response_dto_1.createSuccessResponse)(responseData, userData.id);
        }
        catch (error) {
            if (error.message === 'Invalid credentials') {
                return (0, response_dto_1.createErrorResponse)({
                    message: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS'
                });
            }
            return (0, response_dto_1.createErrorResponse)(error);
        }
    }
    async register(data) {
        try {
            const existingUserByEmail = await this.usersService.findByEmail(data.email);
            if (existingUserByEmail) {
                throw new Error('Email already exists');
            }
            const existingUserByPhone = await this.usersService.findByPhone(data.phoneNumber);
            if (existingUserByPhone) {
                throw new Error('Phone number already exists');
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.usersService.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            return (0, response_dto_1.createSuccessResponse)(user, user.id);
        }
        catch (error) {
            if (error.message === 'Email already exists') {
                return (0, response_dto_1.createErrorResponse)({
                    message: 'Email already exists',
                    code: 'EMAIL_EXISTS'
                });
            }
            else if (error.message === 'Phone number already exists') {
                return (0, response_dto_1.createErrorResponse)({
                    message: 'Phone number already exists',
                    code: 'PHONE_EXISTS'
                });
            }
            return (0, response_dto_1.createErrorResponse)(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map