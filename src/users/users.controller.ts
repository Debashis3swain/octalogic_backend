import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '../common/response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    try {
      const userData = await this.usersService.findById(req.user.userId);
      if (!userData) {
        return createErrorResponse({
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }
      return createSuccessResponse(userData, req.user.userId);
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
