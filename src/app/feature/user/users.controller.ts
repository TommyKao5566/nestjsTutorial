import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './users.dto';
import { Users } from 'typeorm-model/Users';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http://localhost:3000/user/register
  @Post('register')
  async createUser(@Body() data: CreateUserRequest): Promise<Users> {
    return this.usersService.register(data);
  }
}
