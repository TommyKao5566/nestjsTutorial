import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Users } from 'typeorm-model/Users';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async find(): Promise<Users[] | null> {
    const res = await this.usersRepository.find();

    return res;
  }

  async findOne(id: number): Promise<Users | null> {
    const res = await this.usersRepository.findOne({ where: { id: id } });

    return res;
  }

  async register(data: Partial<Users>):Promise<Users> {

    delete data.status;
    delete data.role;

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    data.password = hashedPassword;

    const newData = this.usersRepository.create(data);
    return await this.usersRepository.save(newData);
  }

  async update(id: number, data: Partial<Users>):Promise<UpdateResult> {
    const res = await this.usersRepository.update(id, data);
    return res;
  }

  async remove(id: number): Promise<DeleteResult> {
    const res = await this.usersRepository.delete(id);
    return res
  }
}
