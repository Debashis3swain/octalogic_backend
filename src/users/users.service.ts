import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByPhone(phoneNumber: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }

  async findById(id: number): Promise<Partial<User> | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return undefined;
    
    // Create a user object without sensitive fields
    const { password, ...userData } = user;
    return userData;
  }
}
