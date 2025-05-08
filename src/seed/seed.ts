import { DataSource } from 'typeorm';
import { VehicleType } from '../vehicle-types/vehicle-type.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Booking } from '../bookings/booking.entity';
import { User } from '../users/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [VehicleType, Vehicle, Booking, User],
  synchronize: true
});

async function seed() {
  await AppDataSource.initialize();
  
  // Drop existing tables if they exist
  // Let TypeORM handle table creation through synchronize: true

  const vehicleTypeRepo = AppDataSource.getRepository(VehicleType);
  const vehicleRepo = AppDataSource.getRepository(Vehicle);

  // Car Types
  const hatchback = vehicleTypeRepo.create({ name: 'Hatchback', category: 'car' });
  const suv = vehicleTypeRepo.create({ name: 'SUV', category: 'car' });
  const sedan = vehicleTypeRepo.create({ name: 'Sedan', category: 'car' });
  // Bike Type
  const cruiser = vehicleTypeRepo.create({ name: 'Cruiser', category: 'bike' });

  await vehicleTypeRepo.save([hatchback, suv, sedan, cruiser]);

  // Vehicles
  await vehicleRepo.save([
    vehicleRepo.create({ name: 'Swift', registrationNumber: 'HB1001', type: hatchback }),
    vehicleRepo.create({ name: 'Baleno', registrationNumber: 'HB1002', type: hatchback }),
    vehicleRepo.create({ name: 'Creta', registrationNumber: 'SUV1001', type: suv }),
    vehicleRepo.create({ name: 'Fortuner', registrationNumber: 'SUV1002', type: suv }),
    vehicleRepo.create({ name: 'City', registrationNumber: 'SD1001', type: sedan }),
    vehicleRepo.create({ name: 'Verna', registrationNumber: 'SD1002', type: sedan }),
    vehicleRepo.create({ name: 'Royal Enfield', registrationNumber: 'CR1001', type: cruiser }),
    vehicleRepo.create({ name: 'Avenger', registrationNumber: 'CR1002', type: cruiser }),
  ]);

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
