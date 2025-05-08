import { Controller, Get, Param } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';

@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(private vehicleTypesService: VehicleTypesService) {}

  @Get()
  async getAll() {
    return { vehicleTypes: await this.vehicleTypesService.findAll() };
  }

  @Get('categories')
  async getCategories() {
    return { categories: await this.vehicleTypesService.getCategories() };
  }
  
  @Get('by-category/:category')
  async getByCategory(@Param('category') category: string) {
    return { types: await this.vehicleTypesService.findByCategory(category) };
  }

  @Get('rental-options')
  async getRentalOptions() {
    const categories = await this.vehicleTypesService.getCategories();
    
    const result = {};
    
    for (const category of categories) {
      const types = await this.vehicleTypesService.findByCategory(category);
      result[category] = types.map(type => ({
        id: type.id,
        name: type.name,
        vehicleCount: type.vehicles?.length || 0
      }));
    }
    
    return { rentalOptions: result };
  }
}
