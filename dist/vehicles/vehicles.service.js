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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let VehiclesService = class VehiclesService {
    constructor(vehicleRepository, bookingRepository) {
        this.vehicleRepository = vehicleRepository;
        this.bookingRepository = bookingRepository;
    }
    async findAll() {
        return this.vehicleRepository.find({ relations: ['type'] });
    }
    async findByType(typeId) {
        return this.vehicleRepository.find({ where: { type: { id: typeId } }, relations: ['type'] });
    }
    async findById(id) {
        return this.vehicleRepository.findOne({ where: { id }, relations: ['type'] });
    }
    async findAvailableVehiclesByType(typeId, startDate, endDate) {
        if (!startDate || !endDate) {
            throw new common_1.BadRequestException('Start date and end date are required');
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (start >= end) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const vehicles = await this.findByType(typeId);
        if (!vehicles.length) {
            throw new common_1.NotFoundException(`No vehicles found for type with ID ${typeId}`);
        }
        const availableVehicles = [];
        for (const vehicle of vehicles) {
            const overlappingBookings = await this.bookingRepository.count({
                where: {
                    vehicle: { id: vehicle.id },
                    status: 'confirmed',
                    startDate: (0, typeorm_2.LessThanOrEqual)(endDate),
                    endDate: (0, typeorm_2.MoreThanOrEqual)(startDate)
                }
            });
            if (overlappingBookings === 0) {
                availableVehicles.push(vehicle);
            }
        }
        return availableVehicles;
    }
    async findAvailableVehiclesByCategory(category, startDate, endDate) {
        if (!category || !startDate || !endDate) {
            throw new common_1.BadRequestException('Category, start date, and end date are required');
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (start >= end) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const vehicles = await this.vehicleRepository.find({
            where: { type: { category } },
            relations: ['type']
        });
        if (!vehicles.length) {
            throw new common_1.NotFoundException(`No vehicles found for category ${category}`);
        }
        const availableVehicles = [];
        for (const vehicle of vehicles) {
            const overlappingBookings = await this.bookingRepository.count({
                where: {
                    vehicle: { id: vehicle.id },
                    status: 'confirmed',
                    startDate: (0, typeorm_2.LessThanOrEqual)(endDate),
                    endDate: (0, typeorm_2.MoreThanOrEqual)(startDate)
                }
            });
            if (overlappingBookings === 0) {
                availableVehicles.push(vehicle);
            }
        }
        return availableVehicles;
    }
    async checkDateAvailability(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return false;
        }
        if (start < today || start >= end) {
            return false;
        }
        return true;
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map