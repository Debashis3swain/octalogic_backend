import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type.entity';
export declare class VehicleTypesService {
    private vehicleTypeRepository;
    constructor(vehicleTypeRepository: Repository<VehicleType>);
    findAll(): Promise<VehicleType[]>;
    findByCategory(category: string): Promise<VehicleType[]>;
    getCategories(): Promise<string[]>;
}
