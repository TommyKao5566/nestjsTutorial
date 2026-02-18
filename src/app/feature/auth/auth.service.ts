import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'typeorm-model/Users';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterRequest):Promise<Users> {

    // Securely hash the plain password using bcrypt to prevent storing raw passwords in the database
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    data.password = hashedPassword;

    const newData = this.usersRepository.create(data);
    return await this.usersRepository.save(newData);
  }

  async login(data: LoginRequest): Promise<{ accessToken: string; refreshToken: string }> {

    const user = await this.usersRepository.findOne({ where: { username: data.username}});

    // user not exist or wrong password
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new HttpException(
        'ERROR_CODES.UNAUTHORIZED',
        401,
      );
    }

    // if status is not "active"
    if (user.status !== 'active') {
      throw new HttpException('Account is not active', 401);
    }

    const payload = { username: user.username, role: user.role };

    // generate Access Token（expired in 8 hours）
    const accessToken = await this.jwtService.signAsync(
      { ...payload, type: 'access' },
      {
        expiresIn: '8h',
      },
    );

    // generate Refresh Token（expired in 7 days）
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      {
        expiresIn: '7d',
      },
    );

    this.usersRepository.update({ username: data.username},{ refreshToken });

    return { accessToken, refreshToken };
  }

}
