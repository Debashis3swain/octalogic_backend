import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiResponse } from '../common/response.dto';
import { UsersService } from '../users/users.service';
export declare class BookingsController {
    private bookingsService;
    private usersService;
    constructor(bookingsService: BookingsService, usersService: UsersService);
    createBooking(userId: number, createBookingDto: Omit<CreateBookingDto, 'name' | 'email'>): Promise<ApiResponse>;
    getBookingsByEmail(email: string): Promise<ApiResponse>;
    getAll(): Promise<ApiResponse>;
    checkVehicleAvailability(vehicleId: number, dateRange: {
        startDate: string;
        endDate: string;
    }): Promise<ApiResponse>;
}
