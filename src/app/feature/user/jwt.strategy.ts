import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // read JWT from header
      ignoreExpiration: false, // ignoreExpiration
      secretOrKey: jwtConstants.secret, // JWT secret
    });
  }

  async validate(payload: any) {
    if (payload.type !== 'access') {
      throw new HttpException(
        'ERROR_CODES.UNAUTHORIZED',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return payload;
  }
}