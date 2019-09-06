import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { LikeEntity } from './like.entity';

import { UserEntity } from '../user/user.entity';
import { PhotoEntity } from '../photo/photo.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  async createOne(user: UserEntity, photo: PhotoEntity): Promise<LikeEntity> {
    return await this.likeRepository.save({ user, photo });
  }

  async deleteOne(user: UserEntity, photo: PhotoEntity): Promise<DeleteResult> {
    return await this.likeRepository.delete({ user, photo });
  }
}
