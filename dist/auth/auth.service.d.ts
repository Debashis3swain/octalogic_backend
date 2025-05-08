import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ApiResponse } from '../common/response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<ApiResponse>;
    login(user: any): Promise<ApiResponse>;
    register(data: {
        email: string;
        password: string;
        name: string;
        phoneNumber: string;
    }): Promise<ApiResponse>;
}
