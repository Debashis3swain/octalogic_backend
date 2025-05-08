import { Controller, Post, Get, Body, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '../common/response.dto';
import { UsersService } from '../users/users.service';

@Controller('bookings')
export class BookingsController {
  constructor(
    private bookingsService: BookingsService,
    private usersService: UsersService
  ) {}

  @Post(':userId')
  async createBooking(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ValidationPipe({ transform: true })) createBookingDto: Omit<CreateBookingDto, 'name' | 'email'>
  ) {
    try {
      // Get user details
      const user = await this.usersService.findById(userId);
      if (!user) {
        return createErrorResponse({
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      // Create booking with user details
      const booking = await this.bookingsService.createBookingFromDto({
        ...createBookingDto,
        name: user.name,
        email: user.email
      });

      return createSuccessResponse({
        booking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      return createErrorResponse(error);
    }
  }

  @Get('user/:email')
  async getBookingsByEmail(@Param('email') email: string) {
    try {
      const bookings = await this.bookingsService.findByUserEmail(email);
      return createSuccessResponse({ bookings });
    } catch (error) {
      return createErrorResponse(error);
    }
  }

  @Get()
  async getAll() {
    try {
      const bookings = await this.bookingsService.findAll();
      return createSuccessResponse({ bookings });
    } catch (error) {
      return createErrorResponse(error);
    }
  }

  @Get('check-availability/vehicle/:vehicleId')
  async checkVehicleAvailability(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body(new ValidationPipe({ transform: true })) dateRange: { startDate: string; endDate: string }
  ) {
    try {
      const { startDate, endDate } = dateRange;
      const isAvailable = await this.bookingsService.checkVehicleAvailability(vehicleId, startDate, endDate);
      return createSuccessResponse({
        available: isAvailable
      });
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
