import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  createAt: Date;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updateAt',
  })
  updateAt: Date;
}
