import { UsersService } from './users.service';
import { ApiResponse } from '../common/response.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<ApiResponse>;
}
