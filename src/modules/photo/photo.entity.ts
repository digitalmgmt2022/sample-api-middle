import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

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
