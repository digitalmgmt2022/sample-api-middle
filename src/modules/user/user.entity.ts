import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { LikeEntity } from '../like/like.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id?: number;

  @IsString()
  @MaxLength(254)
  @ApiModelProperty({ example: 'Robinson' })
  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'login',
  })
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(254)
  @ApiModelProperty({ example: 'qwerty1234' })
  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'password',
  })
  password: string;

  @OneToMany(_type => LikeEntity, likes => likes.photo, {
    nullable: true,
    cascade: true,
  })
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
