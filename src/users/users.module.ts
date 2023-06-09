import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from 'src/auth/auth.module';
import {UserSchema} from '../users/schemas/users.schema';
import {UsersController} from './users.controller';
import {UsersService} from "./users.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}