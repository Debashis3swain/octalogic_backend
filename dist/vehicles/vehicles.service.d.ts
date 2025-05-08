import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Booking } from '../bookings/booking.entity';
export declare class VehiclesService {
    private vehicleRepository;
    private bookingRepository;
    constructor(vehicleRepository: Repository<Vehicle>, bookingRepository: Repository<Booking>);
    findAll(): Promise<Vehicle[]>;
    findByType(typeId: number): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | undefined>;
    findAvailableVehiclesByType(typeId: number, startDate: string, endDate: string): Promise<Vehicle[]>;
    findAvailableVehiclesByCategory(category: string, startDate: string, endDate: string): Promise<Vehicle[]>;
    checkDateAvailability(startDate: string, endDate: string): Promise<boolean>;
}
