import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Booking } from './booking.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { User } from '../users/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBookingFromDto(bookingDto: CreateBookingDto): Promise<Booking> {
    const { vehicleId, startDate, endDate, name, email, phoneNumber, notes } = bookingDto;
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    
    if (start < today) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }

    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 30) {
      throw new BadRequestException('Booking cannot exceed 30 days');
    }
    
    // Find or create user
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Create a new user if not found
      user = this.userRepository.create({
        name,
        email,
        phoneNumber: phoneNumber || '',
        password: '', // Empty password for now, user would need to set it if they want to log in
      });
      await this.userRepository.save(user);
    } else {
      // Update the existing user's information if they already exist
      user.name = name; // Update name if it changed
      if (phoneNumber) {
        user.phoneNumber = phoneNumber; // Update phone if provided
      }
      await this.userRepository.save(user);
    }
    
    // Find vehicle
    const vehicle = await this.vehicleRepository.findOne({ 
      where: { id: vehicleId },
      relations: ['type']
    });
    
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
    }
    
    // Check for availability
    const isAvailable = await this.checkVehicleAvailability(vehicleId, startDate, endDate);
    if (!isAvailable) {
      throw new BadRequestException(`Vehicle is not available for the selected dates`);
    }
    
    // Create booking
    const booking = this.bookingsRepository.create({
      user,
      vehicle,
      startDate,
      endDate,
      status: 'confirmed',
      notes: notes || '',
    });
    
    return this.bookingsRepository.save(booking);
  }

  async checkVehicleAvailability(vehicleId: number, startDate: string, endDate: string): Promise<boolean> {
    // Check if there are any overlapping bookings for this vehicle
    const overlappingBookings = await this.bookingsRepository.count({
      where: {
        vehicle: { id: vehicleId },
        status: 'confirmed',
        // Check for date range overlap
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate)
      }
    });
    
    return overlappingBookings === 0;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({ relations: ['user', 'vehicle'] });
  }

  async findByUser(userId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({ 
      where: { user: { id: userId } }, 
      relations: ['vehicle', 'vehicle.type'] 
    });
  }
  
  async findByUserEmail(email: string): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { user: { email } },
      relations: ['vehicle', 'vehicle.type', 'user']
    });
  }
}
