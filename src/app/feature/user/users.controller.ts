import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginRequest, RegisterRequest } from './users.dto';
import { Users } from 'typeorm-model/Users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http://localhost:3000/user/register
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() data: RegisterRequest): Promise<Users> {
    return this.usersService.register(data);
  }

  // http://localhost:3000/user/login
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() data: LoginRequest) {
    return this.usersService.login(data);
  }
}
