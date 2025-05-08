import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    create(user: Partial<User>): Promise<User>;
    findByPhone(phoneNumber: string): Promise<User | undefined>;
    findById(id: number): Promise<Partial<User> | undefined>;
}
