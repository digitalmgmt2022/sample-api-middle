import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhotoEntity } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async createOne(photo: PhotoEntity): Promise<PhotoEntity> {
    return await this.photoRepository.save(photo);
  }

  async selectOne(id: number): Promise<PhotoEntity> {
    return await this.photoRepository.findOneOrFail(id);
  }

  async selectMany(): Promise<PhotoEntity[]> {
    return await this.photoRepository.find();
  }
}
