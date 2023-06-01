import {Document} from 'mongoose';

export interface Otp extends Document {
  email: string;
}