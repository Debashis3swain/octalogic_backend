import { IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AvailabilityQueryDto {
  @IsNotEmpty({ message: 'Start date is required' })
  @IsDateString({}, { message: 'Start date must be a valid date string (YYYY-MM-DD)' })
  startDate: string;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDateString({}, { message: 'End date must be a valid date string (YYYY-MM-DD)' })
  endDate: string;
}
