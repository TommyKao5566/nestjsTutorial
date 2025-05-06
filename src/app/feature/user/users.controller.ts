import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterRequest } from './users.dto';
import { Users } from 'typeorm-model/Users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http://localhost:3000/user/register
  @Post('register')
  async register(@Body() data: RegisterRequest): Promise<Users> {
    return this.usersService.register(data);
  }
}
