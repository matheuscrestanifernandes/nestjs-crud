import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from 'src/users/users.module';
import {AuthModule} from './auth/auth.module';
import {OtpModule} from './otp/otp.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    OtpModule,
  ],
})

export class AppModule {}
