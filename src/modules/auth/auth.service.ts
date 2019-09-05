import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(payload: UserEntity): Promise<any> {
    return {
      expiresIn: this.configService.get('JWT_EXPIRES_TIME'),
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: UserEntity): Promise<any> {
    const user = await this.userService.selectOne(payload);
    return await compare(payload.password, user.password).then(() => {
      return user;
    });
  }
}
