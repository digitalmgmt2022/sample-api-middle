import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { LikeEntity } from '../like/like.entity';

@Entity('Photo')
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id?: number;

  @IsUrl()
  @IsString()
  @ApiModelProperty({ example: 'https://picsum.photos/200' })
  @Column('varchar', {
    nullable: false,
    name: 'login',
  })
  src: string;

  @OneToMany(_type => LikeEntity, likes => likes.photo, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'likes' })
  likes: LikeEntity[];

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  private createAt?: Date;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updateAt',
  })
  private updateAt: Date;
}
