import { AuthService } from './auth.service';
import { ApiResponse } from '../common/response.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<ApiResponse>;
    login(body: any): Promise<ApiResponse>;
}
