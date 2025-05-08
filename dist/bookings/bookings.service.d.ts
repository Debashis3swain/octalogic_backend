import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { User } from '../users/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private bookingsRepository;
    private vehicleRepository;
    private userRepository;
    constructor(bookingsRepository: Repository<Booking>, vehicleRepository: Repository<Vehicle>, userRepository: Repository<User>);
    createBookingFromDto(bookingDto: CreateBookingDto): Promise<Booking>;
    checkVehicleAvailability(vehicleId: number, startDate: string, endDate: string): Promise<boolean>;
    findAll(): Promise<Booking[]>;
    findByUser(userId: number): Promise<Booking[]>;
    findByUserEmail(email: string): Promise<Booking[]>;
}
