import { VehicleType } from '../vehicle-types/vehicle-type.entity';
import { Booking } from '../bookings/booking.entity';
export declare class Vehicle {
    id: number;
    name: string;
    registrationNumber: string;
    type: VehicleType;
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
