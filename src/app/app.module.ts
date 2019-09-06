import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { PhotoModule } from '../modules/photo/photo.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule, PhotoModule],
})
export class AppModule {}
