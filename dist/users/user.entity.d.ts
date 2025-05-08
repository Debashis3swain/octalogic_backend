import { Booking } from '../bookings/booking.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
