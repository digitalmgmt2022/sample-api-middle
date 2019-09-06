import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { PhotoEntity } from '../photo/photo.entity';

@Entity('Like')
@Index(['user', 'photo'], { unique: true })
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id?: number;

  @ManyToOne(_type => UserEntity, users => users.likes, {
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(_type => PhotoEntity, photo => photo.likes, {
    nullable: false,
  })
  photo: PhotoEntity;

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
