import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeEntity } from './like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
