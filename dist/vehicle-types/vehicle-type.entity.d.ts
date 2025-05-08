import { Vehicle } from '../vehicles/vehicle.entity';
export declare class VehicleType {
    id: number;
    name: string;
    category: string;
    vehicles: Vehicle[];
    created_at: Date;
    updated_at: Date;
}
