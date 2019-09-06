import { HttpException, HttpStatus } from '@nestjs/common';
import { Post, Get, Param, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { PhotoService } from './photo.service';
import { PhotoEntity } from './photo.entity';

@ApiUseTags('photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createOne(@Body() payload: PhotoEntity): Promise<PhotoEntity> {
    return await this.photoService.createOne(payload);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectOne(@Param('id') id: number): Promise<PhotoEntity> {
    return await this.photoService.selectOne(id).catch(() => {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    });
  }

  @Get()
  async selectMany(): Promise<PhotoEntity[]> {
    return await this.photoService.selectMany();
  }
}
