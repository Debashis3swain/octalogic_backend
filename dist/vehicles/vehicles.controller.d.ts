import { VehiclesService } from './vehicles.service';
import { AvailabilityQueryDto, VehicleSearchDto } from './dto';
export declare class VehiclesController {
    private vehiclesService;
    constructor(vehiclesService: VehiclesService);
    getAll(): Promise<{
        vehicles: import("./vehicle.entity").Vehicle[];
    }>;
    getByType(typeId: number): Promise<{
        vehicles: import("./vehicle.entity").Vehicle[];
    }>;
    getAvailableByType(typeId: number, query: AvailabilityQueryDto): Promise<{
        vehicles: import("./vehicle.entity").Vehicle[];
    }>;
    searchVehicles(query: VehicleSearchDto): Promise<{
        vehicles: import("./vehicle.entity").Vehicle[];
        message?: undefined;
    } | {
        vehicles: any[];
        message: any;
    }>;
}
