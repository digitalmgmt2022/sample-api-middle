import { Controller, UseGuards } from '@nestjs/common';
import { Body, Post, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '../../common/decorators/user.decorator';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strateges/jwt.strategy';
import { UserEntity } from '../user/user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post()
  async create(@Body() payload: UserEntity): Promise<any> {
    const user = await this.jwtStrategy.validate(payload);
    return await this.authService.signIn(user);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@User() payload: UserEntity): Promise<any> {
    return await this.authService.signIn(payload);
  }
}
