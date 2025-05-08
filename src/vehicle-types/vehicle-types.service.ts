import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type.entity';

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectRepository(VehicleType)
    private vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  async findAll(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find({ relations: ['vehicles'] });
  }

  async findByCategory(category: string): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find({ 
      where: { category },
      relations: ['vehicles']
    });
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.vehicleTypeRepository
      .createQueryBuilder('vehicleType')
      .select('DISTINCT vehicleType.category', 'category')
      .getRawMany();
    
    return categories.map(item => item.category);
  }
}
