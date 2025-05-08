# Octalogic Backend

A vehicle rental management system built with NestJS, PostgreSQL, and TypeORM.

## Features

- User authentication and authorization
- Vehicle management (cars and bikes)
- Booking system
- Timestamp tracking for all operations

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Debashis3swain/octalogic_backend.git
cd octalogic_backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following content:
```
DATABASE_URL=postgresql://username:password@localhost:5432/vehiclerental
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=3600s
```

4. Initialize the database:
Connect to PostgreSQL as a superuser and run:
```sql
CREATE DATABASE vehiclerental;
CREATE USER octalogic_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE vehiclerental TO octalogic_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO octalogic_user;
```

## Database Setup

1. Create the database tables:
```bash
npm run seed
```

This will:
- Create all necessary tables
- Insert default vehicle types (Hatchback, SUV, Sedan, Cruiser)
- Insert sample vehicles with unique registration numbers
- Add timestamp columns to all tables

## Running the Application

1. Start the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

2. The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run start`: Start the application in production mode
- `npm run start:dev`: Start the application in development mode with hot reload
- `npm run seed`: Seed the database with initial data
- `npm run migration:generate`: Generate a new migration file
- `npm run migration:run`: Run all pending migrations

## API Endpoints

- **Auth**
  - POST `/auth/login` - Login user
  - POST `/auth/register` - Register new user

- **Users**
  - GET `/users` - Get all users
  - GET `/users/:id` - Get user by ID
  - POST `/users` - Create new user

- **Vehicles**
  - GET `/vehicles` - Get all vehicles
  - GET `/vehicles/:id` - Get vehicle by ID
  - POST `/vehicles` - Create new vehicle
  - PUT `/vehicles/:id` - Update vehicle

- **Bookings**
  - GET `/bookings` - Get all bookings
  - GET `/bookings/:id` - Get booking by ID
  - POST `/bookings` - Create new booking
  - PUT `/bookings/:id` - Update booking

## Project Structure

```
src/
├── bookings/         # Booking related entities and controllers
├── seed/            # Database seeding scripts
├── users/           # User related entities and controllers
├── vehicle-types/   # Vehicle type entities
└── vehicles/        # Vehicle entities and controllers
```

## Technologies Used

- NestJS
- PostgreSQL
- TypeORM
- JWT for authentication
- Joi for validation
- Passport for authentication

## License

This project is licensed under the MIT License - see the LICENSE file for details.
