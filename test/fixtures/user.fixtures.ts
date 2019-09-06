import { internet } from 'faker';
import { UserEntity } from '../../src/modules/user/user.entity';

export class GenerateUser extends UserEntity {
  login: string = internet.userName();
  password: string = internet.password();
}

export class GenerateBadUser {
  login: any = 111111;
  password: string = internet.password(1);
}
