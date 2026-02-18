import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'typeorm-model/Users';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '8h' },
    /* signOptions: {}, 不設置 expiresIn 即為永久，此處為預設值，後續還是可以指定其他効期
      jwtService.signAsync(payload, {
        expiresIn: '7d',
      })
    */
  }),

],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}