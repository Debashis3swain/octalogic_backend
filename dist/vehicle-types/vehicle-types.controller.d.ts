import { VehicleTypesService } from './vehicle-types.service';
export declare class VehicleTypesController {
    private vehicleTypesService;
    constructor(vehicleTypesService: VehicleTypesService);
    getAll(): Promise<{
        vehicleTypes: import("./vehicle-type.entity").VehicleType[];
    }>;
    getCategories(): Promise<{
        categories: string[];
    }>;
    getByCategory(category: string): Promise<{
        types: import("./vehicle-type.entity").VehicleType[];
    }>;
    getRentalOptions(): Promise<{
        rentalOptions: {};
    }>;
}
