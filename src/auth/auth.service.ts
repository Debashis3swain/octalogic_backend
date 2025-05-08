import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '../common/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ApiResponse> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return createSuccessResponse(result, user.id);
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      return createErrorResponse(error);
    }
  }

  async login(user: any): Promise<ApiResponse> {
    try {
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s'
      });
      
      const userData = await this.usersService.findById(user.id);
      if (!userData) {
        throw new Error('User not found');
      }
      const responseData = {
        id: userData.id,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        token: token,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      };

      return createSuccessResponse(responseData, userData.id);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return createErrorResponse({
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
      }
      return createErrorResponse(error);
    }
  }

  async register(data: { email: string, password: string, name: string, phoneNumber: string }): Promise<ApiResponse> {
    try {
      const existingUserByEmail = await this.usersService.findByEmail(data.email);
      if (existingUserByEmail) {
        throw new Error('Email already exists');
      }
      const existingUserByPhone = await this.usersService.findByPhone(data.phoneNumber);
      if (existingUserByPhone) {
        throw new Error('Phone number already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.usersService.create({ ...data, password: hashedPassword });
      return createSuccessResponse(user, user.id);
    } catch (error) {
      if (error.message === 'Email already exists') {
        return createErrorResponse({
          message: 'Email already exists',
          code: 'EMAIL_EXISTS'
        });
      } else if (error.message === 'Phone number already exists') {
        return createErrorResponse({
          message: 'Phone number already exists',
          code: 'PHONE_EXISTS'
        });
      }
      return createErrorResponse(error);
    }
  }
}
