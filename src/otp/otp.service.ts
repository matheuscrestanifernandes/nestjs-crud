import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {customAlphabet} from 'nanoid';
import {createTransport} from 'nodemailer';
import {UsersService} from 'src/users/users.service';
import {CreateOtpDto} from './dto/create-otp.dto';
import {REDIS_CLIENT, RedisClient} from './types/otp.types';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('User')
    private readonly userService: UsersService,
    @Inject(REDIS_CLIENT) private readonly redis: RedisClient,
  ) {}

  public async create(createOtpDto: CreateOtpDto) {
    try {
      const user = await this.userService.findByEmail(createOtpDto.email);
 
      const OTP = customAlphabet("1234567890", 6)();
  
      await this.redis.set(`${user.email}`, OTP)
      await this.redis.expire(`${user.email}`, 600)
  
      const transporter = createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      });
  
      const emailBody = `
        <p style="font-size:16px;color:#555;line-height:1.2;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">Hi,</p>
        <p style="font-size:16px;color:#555;line-height:1.2;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">Use the code below to verify on the website:</p>
        <p style="font-size:13px;color:#171717;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
        ${OTP}
        </p>
      `;
  
      await transporter.sendMail({
        from: process.env.MAIL_PROVIDER,
        to: createOtpDto.email,
        subject: 'Verification Code',
        html: emailBody,
      });

      return 'If an account is registered to this email, we send a verification link to it';
    } catch(err) {
      return err.message;
    }
  }

  public async verifyOtp(createOtpDto: CreateOtpDto){
    try{
      const val = await this.redis.get(`${createOtpDto.email}`);
      const otp = createOtpDto.otp;

      if(val === otp) {
        await this.redis.del(`${createOtpDto.email}`);
        return 'verify with success';
      }
      
      await this.redis.del(`${createOtpDto.email}`);
      return 'error in authentification';
    }catch(err) {
      return err.message;
    } 
  }

  onModuleDestroy() {
    this.redis.quit();
  }
}
