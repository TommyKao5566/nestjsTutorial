import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'typeorm-model/Users';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async register(data: Partial<Users>):Promise<Users> {

    // Force apply DB defaults: status = 'inactive', role = 'user'
    // We'll manually activate the account later directly in the DB
    delete data.status;
    delete data.role;

    // Securely hash the plain password using bcrypt to prevent storing raw passwords in the database
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    data.password = hashedPassword;

    const newData = this.usersRepository.create(data);
    return await this.usersRepository.save(newData);
  }

}
