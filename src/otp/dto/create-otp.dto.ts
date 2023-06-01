import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Length(6)
  otp: string;
}
