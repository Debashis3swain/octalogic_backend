import { User } from '../users/user.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
export declare class Booking {
    id: number;
    user: User;
    vehicle: Vehicle;
    startDate: string;
    endDate: string;
    status: string;
    notes: string;
    created_at: Date;
    updated_at: Date;
}
