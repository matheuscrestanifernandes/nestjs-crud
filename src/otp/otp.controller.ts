import {Body, Controller, Post} from '@nestjs/common';
import {CreateOtpDto} from './dto/create-otp.dto';
import {OtpService} from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/Request')
  create(@Body() createOtpDto: CreateOtpDto): any {
    return this.otpService.create(createOtpDto);
  }

  @Post('/verify')
  verifyOtp(@Body() createOtpDto: CreateOtpDto): any {
    return this.otpService.verifyOtp(createOtpDto);
  }
}
