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
exports.VehicleTypesController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_types_service_1 = require("./vehicle-types.service");
let VehicleTypesController = class VehicleTypesController {
    constructor(vehicleTypesService) {
        this.vehicleTypesService = vehicleTypesService;
    }
    async getAll() {
        return { vehicleTypes: await this.vehicleTypesService.findAll() };
    }
    async getCategories() {
        return { categories: await this.vehicleTypesService.getCategories() };
    }
    async getByCategory(category) {
        return { types: await this.vehicleTypesService.findByCategory(category) };
    }
    async getRentalOptions() {
        const categories = await this.vehicleTypesService.getCategories();
        const result = {};
        for (const category of categories) {
            const types = await this.vehicleTypesService.findByCategory(category);
            result[category] = types.map(type => {
                var _a;
                return ({
                    id: type.id,
                    name: type.name,
                    vehicleCount: ((_a = type.vehicles) === null || _a === void 0 ? void 0 : _a.length) || 0
                });
            });
        }
        return { rentalOptions: result };
    }
};
exports.VehicleTypesController = VehicleTypesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('by-category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)('rental-options'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "getRentalOptions", null);
exports.VehicleTypesController = VehicleTypesController = __decorate([
    (0, common_1.Controller)('vehicle-types'),
    __metadata("design:paramtypes", [vehicle_types_service_1.VehicleTypesService])
], VehicleTypesController);
//# sourceMappingURL=vehicle-types.controller.js.map