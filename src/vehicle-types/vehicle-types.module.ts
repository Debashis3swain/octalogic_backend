import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './vehicle-type.entity';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleTypesController } from './vehicle-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  providers: [VehicleTypesService],
  controllers: [VehicleTypesController],
  exports: [VehicleTypesService],
})
export class VehicleTypesModule {}
