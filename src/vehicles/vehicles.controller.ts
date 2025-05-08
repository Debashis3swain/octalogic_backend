import { Controller, Get, Param, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { AvailabilityQueryDto, VehicleSearchDto } from './dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async getAll() {
    return { vehicles: await this.vehiclesService.findAll() };
  }

  @Get('type/:typeId')
  async getByType(@Param('typeId', ParseIntPipe) typeId: number) {
    return { vehicles: await this.vehiclesService.findByType(typeId) };
  }
  
  @Get('available/type/:typeId')
  async getAvailableByType(
    @Param('typeId', ParseIntPipe) typeId: number,
    @Query(new ValidationPipe({ transform: true })) query: AvailabilityQueryDto
  ) {
    const { startDate, endDate } = query;
    const vehicles = await this.vehiclesService.findAvailableVehiclesByType(typeId, startDate, endDate);
    return { vehicles };
  }

  @Get('search')
  async searchVehicles(@Query(new ValidationPipe({ transform: true })) query: VehicleSearchDto) {
    const { category, typeId, startDate, endDate } = query;
    
    // First check if dates are valid
    const datesValid = await this.vehiclesService.checkDateAvailability(startDate, endDate);
    if (!datesValid) {
      return { 
        vehicles: [],
        message: 'Invalid date range. Please ensure start date is not in the past and is before end date.'
      };
    }

    try {
      if (typeId) {
        const vehicles = await this.vehiclesService.findAvailableVehiclesByType(parseInt(typeId), startDate, endDate);
        return { vehicles };
      }
      
      if (category) {
        const vehicles = await this.vehiclesService.findAvailableVehiclesByCategory(category, startDate, endDate);
        return { vehicles };
      }
      
      return { vehicles: [], message: 'Please provide either category or typeId to search' };
    } catch (error) {
      return { 
        vehicles: [],
        message: error.message || 'An error occurred while searching for vehicles'
      };
    }
  }
}
