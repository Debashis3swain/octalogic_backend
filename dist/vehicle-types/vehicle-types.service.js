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
exports.VehicleTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_type_entity_1 = require("./vehicle-type.entity");
let VehicleTypesService = class VehicleTypesService {
    constructor(vehicleTypeRepository) {
        this.vehicleTypeRepository = vehicleTypeRepository;
    }
    async findAll() {
        return this.vehicleTypeRepository.find({ relations: ['vehicles'] });
    }
    async findByCategory(category) {
        return this.vehicleTypeRepository.find({
            where: { category },
            relations: ['vehicles']
        });
    }
    async getCategories() {
        const categories = await this.vehicleTypeRepository
            .createQueryBuilder('vehicleType')
            .select('DISTINCT vehicleType.category', 'category')
            .getRawMany();
        return categories.map(item => item.category);
    }
};
exports.VehicleTypesService = VehicleTypesService;
exports.VehicleTypesService = VehicleTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_type_entity_1.VehicleType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehicleTypesService);
//# sourceMappingURL=vehicle-types.service.js.map