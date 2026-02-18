import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from './auth.dto';
import { Users } from 'typeorm-model/Users';
import { Public } from 'src/app/base/guard/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3000/user/register
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() data: RegisterRequest): Promise<Users> {
    return this.authService.register(data);
  }

  // http://localhost:3000/user/login
  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() data: LoginRequest) {
    return this.authService.login(data);
  }
}
