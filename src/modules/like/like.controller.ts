import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post, Param } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { LikeService } from './like.service';
import { LikeEntity } from './like.entity';

import { PhotoService } from '../photo/photo.service';

import { UserEntity } from '../user/user.entity';

@ApiUseTags('like')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly photoService: PhotoService,
  ) {}

  @Post(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<LikeEntity | DeleteResult> {
    const photo = await this.photoService.selectOne(id).catch(() => {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    });

    return await this.likeService.createOne(user, photo).catch(async () => {
      return await this.likeService.deleteOne(user, photo);
    });
  }
}
