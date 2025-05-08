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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const vehicles_service_1 = require("./vehicles.service");
const dto_1 = require("./dto");
let VehiclesController = class VehiclesController {
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    async getAll() {
        return { vehicles: await this.vehiclesService.findAll() };
    }
    async getByType(typeId) {
        return { vehicles: await this.vehiclesService.findByType(typeId) };
    }
    async getAvailableByType(typeId, query) {
        const { startDate, endDate } = query;
        const vehicles = await this.vehiclesService.findAvailableVehiclesByType(typeId, startDate, endDate);
        return { vehicles };
    }
    async searchVehicles(query) {
        const { category, typeId, startDate, endDate } = query;
        const datesValid = await this.vehiclesService.checkDateAvailability(startDate, endDate);
        if (!datesValid) {
            return {
                vehicles: [],
                message: 'Invalid date range. Please ensure start date is not in the past and is before end date.'
            };
        }
        try {
            if (typeId) {
                const vehicles = await this.vehiclesService.findAvailableVehiclesByType(parseInt(typeId), startDate, endDate);
                return { vehicles };
            }
            if (category) {
                const vehicles = await this.vehiclesService.findAvailableVehiclesByCategory(category, startDate, endDate);
                return { vehicles };
            }
            return { vehicles: [], message: 'Please provide either category or typeId to search' };
        }
        catch (error) {
            return {
                vehicles: [],
                message: error.message || 'An error occurred while searching for vehicles'
            };
        }
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('type/:typeId'),
    __param(0, (0, common_1.Param)('typeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getByType", null);
__decorate([
    (0, common_1.Get)('available/type/:typeId'),
    __param(0, (0, common_1.Param)('typeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.AvailabilityQueryDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getAvailableByType", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VehicleSearchDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "searchVehicles", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map