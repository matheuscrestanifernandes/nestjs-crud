import {FactoryProvider} from '@nestjs/common';
import {createClient} from 'redis';
import {REDIS_CLIENT, RedisClient} from '../types/otp.types';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const client = createClient({ url: process.env.REDIS_URI });
    await client.connect();
    return client;
  },
};