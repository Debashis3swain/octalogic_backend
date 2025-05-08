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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const vehicle_entity_1 = require("../vehicles/vehicle.entity");
const user_entity_1 = require("../users/user.entity");
let BookingsService = class BookingsService {
    constructor(bookingsRepository, vehicleRepository, userRepository) {
        this.bookingsRepository = bookingsRepository;
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }
    async createBookingFromDto(bookingDto) {
        const { vehicleId, startDate, endDate, name, email, phoneNumber, notes } = bookingDto;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (start < today) {
            throw new common_1.BadRequestException('Start date cannot be in the past');
        }
        if (start >= end) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > 30) {
            throw new common_1.BadRequestException('Booking cannot exceed 30 days');
        }
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            user = this.userRepository.create({
                name,
                email,
                phoneNumber: phoneNumber || '',
                password: '',
            });
            await this.userRepository.save(user);
        }
        else {
            user.name = name;
            if (phoneNumber) {
                user.phoneNumber = phoneNumber;
            }
            await this.userRepository.save(user);
        }
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: vehicleId },
            relations: ['type']
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${vehicleId} not found`);
        }
        const isAvailable = await this.checkVehicleAvailability(vehicleId, startDate, endDate);
        if (!isAvailable) {
            throw new common_1.BadRequestException(`Vehicle is not available for the selected dates`);
        }
        const booking = this.bookingsRepository.create({
            user,
            vehicle,
            startDate,
            endDate,
            status: 'confirmed',
            notes: notes || '',
        });
        return this.bookingsRepository.save(booking);
    }
    async checkVehicleAvailability(vehicleId, startDate, endDate) {
        const overlappingBookings = await this.bookingsRepository.count({
            where: {
                vehicle: { id: vehicleId },
                status: 'confirmed',
                startDate: (0, typeorm_2.LessThanOrEqual)(endDate),
                endDate: (0, typeorm_2.MoreThanOrEqual)(startDate)
            }
        });
        return overlappingBookings === 0;
    }
    async findAll() {
        return this.bookingsRepository.find({ relations: ['user', 'vehicle'] });
    }
    async findByUser(userId) {
        return this.bookingsRepository.find({
            where: { user: { id: userId } },
            relations: ['vehicle', 'vehicle.type']
        });
    }
    async findByUserEmail(email) {
        return this.bookingsRepository.find({
            where: { user: { email } },
            relations: ['vehicle', 'vehicle.type', 'user']
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map