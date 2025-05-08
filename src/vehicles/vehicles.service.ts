import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleType } from '../vehicle-types/vehicle-type.entity';
import { Booking } from '../bookings/booking.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['type'] });
  }

  async findByType(typeId: number): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ where: { type: { id: typeId } }, relations: ['type'] });
  }

  async findById(id: number): Promise<Vehicle | undefined> {
    return this.vehicleRepository.findOne({ where: { id }, relations: ['type'] });
  }

  async findAvailableVehiclesByType(typeId: number, startDate: string, endDate: string): Promise<Vehicle[]> {
    if (!startDate || !endDate) {
      throw new BadRequestException('Start date and end date are required');
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    
    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }
    
    // Find all vehicles of the specified type
    const vehicles = await this.findByType(typeId);
    
    if (!vehicles.length) {
      throw new NotFoundException(`No vehicles found for type with ID ${typeId}`);
    }
    
    // Filter out vehicles with overlapping bookings
    const availableVehicles = [];
    
    for (const vehicle of vehicles) {
      // Check for overlapping bookings
      const overlappingBookings = await this.bookingRepository.count({
        where: {
          vehicle: { id: vehicle.id },
          status: 'confirmed', // Only consider confirmed bookings
          // Check for date range overlap
          // Either booking starts during requested period or ends during requested period
          // or completely encompasses the requested period
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(startDate)
        }
      });
      
      if (overlappingBookings === 0) {
        availableVehicles.push(vehicle);
      }
    }
    
    return availableVehicles;
  }

  async findAvailableVehiclesByCategory(category: string, startDate: string, endDate: string): Promise<Vehicle[]> {
    if (!category || !startDate || !endDate) {
      throw new BadRequestException('Category, start date, and end date are required');
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    
    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }
    
    // Find all vehicles of the specified category
    const vehicles = await this.vehicleRepository.find({
      where: { type: { category } },
      relations: ['type']
    });
    
    if (!vehicles.length) {
      throw new NotFoundException(`No vehicles found for category ${category}`);
    }
    
    // Filter out vehicles with overlapping bookings
    const availableVehicles = [];
    
    for (const vehicle of vehicles) {
      // Check for overlapping bookings
      const overlappingBookings = await this.bookingRepository.count({
        where: {
          vehicle: { id: vehicle.id },
          status: 'confirmed',
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(startDate)
        }
      });
      
      if (overlappingBookings === 0) {
        availableVehicles.push(vehicle);
      }
    }
    
    return availableVehicles;
  }

  async checkDateAvailability(startDate: string, endDate: string): Promise<boolean> {
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    
    if (start < today || start >= end) {
      return false;
    }
    
    return true;
  }
}
