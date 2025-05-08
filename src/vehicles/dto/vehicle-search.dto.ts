import { IsNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';

export class VehicleSearchDto {
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'Type ID must be a string' })
  typeId?: string;

  @IsNotEmpty({ message: 'Start date is required' })
  @IsDateString({}, { message: 'Start date must be a valid date string (YYYY-MM-DD)' })
  startDate: string;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDateString({}, { message: 'End date must be a valid date string (YYYY-MM-DD)' })
  endDate: string;
}
