import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from 'src/users/schemas/users.schema';
import {UserModule} from 'src/users/users.module';
import {OtpController} from './otp.controller';
import {OtpService} from './otp.service';
import {redisClientFactory} from './providers/otp.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), UserModule],
  controllers: [OtpController],
  providers: [OtpService, redisClientFactory]
})
export class OtpModule {}
