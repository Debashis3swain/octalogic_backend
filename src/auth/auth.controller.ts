import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as Joi from 'joi';
import { ApiResponse, createErrorResponse, createSuccessResponse } from '../common/response.dto';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required() 
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().optional() 
});

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body): Promise<ApiResponse> {
    const { error } = registerSchema.validate(body);
    if (error) {
      return createErrorResponse({
        message: error.details[0].message,
        code: 'VALIDATION_ERROR'
      });
    }
    try {
      const result = await this.authService.register(body);
      return result;
    } catch (error) {
      return createErrorResponse(error);
    }
  }

  @Post('login')
  async login(@Body() body): Promise<ApiResponse> {
    const { error } = loginSchema.validate(body);
    if (error) {
      return createErrorResponse(error);
    }
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      if (!user) {
        return createErrorResponse(new UnauthorizedException('Invalid credentials'));
      }
      const loginResult = await this.authService.login(user);
      return createSuccessResponse(loginResult.data, loginResult.data.id);
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
