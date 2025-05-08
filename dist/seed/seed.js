"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const vehicle_type_entity_1 = require("../vehicle-types/vehicle-type.entity");
const vehicle_entity_1 = require("../vehicles/vehicle.entity");
const booking_entity_1 = require("../bookings/booking.entity");
const user_entity_1 = require("../users/user.entity");
const dotenv = require("dotenv");
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [vehicle_type_entity_1.VehicleType, vehicle_entity_1.Vehicle, booking_entity_1.Booking, user_entity_1.User],
    synchronize: true
});
async function seed() {
    await AppDataSource.initialize();
    const vehicleTypeRepo = AppDataSource.getRepository(vehicle_type_entity_1.VehicleType);
    const vehicleRepo = AppDataSource.getRepository(vehicle_entity_1.Vehicle);
    const hatchback = vehicleTypeRepo.create({ name: 'Hatchback', category: 'car' });
    const suv = vehicleTypeRepo.create({ name: 'SUV', category: 'car' });
    const sedan = vehicleTypeRepo.create({ name: 'Sedan', category: 'car' });
    const cruiser = vehicleTypeRepo.create({ name: 'Cruiser', category: 'bike' });
    await vehicleTypeRepo.save([hatchback, suv, sedan, cruiser]);
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
//# sourceMappingURL=seed.js.map