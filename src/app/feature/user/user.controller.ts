import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserRequest } from './user.dto';
import { Users } from 'typeorm-model/Users';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // http://localhost:3000/user/findOne/:user_id
  @Post('findOne/:user_id')
  findUserById(@Param('user_id') user_id: number) {
    return this.userService.findOne(user_id);
  }

  // http://localhost:3000/user/list
  @Post('list')
  findAllUser(): Promise<Users[] | null> {
    return this.userService.find();
  }

  // http://localhost:3000/user/register
  @Post('register')
  async createUser(@Body() data: CreateUserRequest): Promise<Users> {
    return this.userService.register(data);
  }

  // http://localhost:3000/user/update
  @Post('update')
  updateUser(@Body() data: Partial<Users>): Promise<UpdateResult> {

    if (!data.id) {
      throw new BadRequestException('id required!');
    }

    return this.userService.update(data.id,data);
  }

  // http://localhost:3000/user/delete
  @Post('delete')
  deleteUser(@Body() data: Partial<Users>): Promise<DeleteResult> {

    if (!data.id) {
      throw new BadRequestException('id required!');
    }

    return this.userService.remove(data.id);
  }
}
