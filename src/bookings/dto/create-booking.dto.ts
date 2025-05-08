import { IsNotEmpty, IsDateString, IsNumber, IsString, IsEmail, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  // User information
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber?: string;

  // Vehicle details
  @IsNotEmpty({ message: 'Vehicle ID is required' })
  @IsNumber({}, { message: 'Vehicle ID must be a number' })
  @Type(() => Number)
  vehicleId: number;

  // Booking dates
  @IsNotEmpty({ message: 'Start date is required' })
  @IsDateString({}, { message: 'Start date must be a valid date string (YYYY-MM-DD)' })
  startDate: string;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDateString({}, { message: 'End date must be a valid date string (YYYY-MM-DD)' })
  endDate: string;

  // Additional notes
  @IsOptional()
  @IsString({ message: 'Notes must be a string' })
  notes?: string;
}
