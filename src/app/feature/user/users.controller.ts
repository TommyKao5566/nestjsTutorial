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
import { Public } from 'src/app/base/guard/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http://localhost:3000/user/register
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() data: RegisterRequest): Promise<Users> {
    return this.usersService.register(data);
  }

  // http://localhost:3000/user/login
  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() data: LoginRequest) {
    return this.usersService.login(data);
  }
}
