// src/infra/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import {
  REDIS_CLIENT,
  ICACHE_PRODUCER,
  ICACHE_PROPERTY,
  ICACHE_FIELD,
} from 'src/core/shared/infrastructure/di/tokens';
import { RedisService } from 'src/core/shared/infrastructure/services/RedisService';
import { Producer } from 'src/core/producer/domain/Producer';
import { Property } from 'src/core/property/domain/Property';
import { Field } from 'src/core/field/domain/Field';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (): Promise<RedisClientType> => {
        const client: RedisClientType = createClient({
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
          username: process.env.REDIS_USER,
          password: process.env.REDIS_PASSWORD,
        });
        client.on('error', (e) => console.error('[redis] error:', e));
        await client.connect();
        return client;
      },
    },
    {
      provide: ICACHE_PRODUCER,
      useFactory: (client: RedisClientType) =>
        new RedisService<Producer>(
          client,
          Number(process.env.TIME_TO_EXPIRE_CACHE),
        ),
      inject: [REDIS_CLIENT],
    },
    {
      provide: ICACHE_FIELD,
      useFactory: (client: RedisClientType) =>
        new RedisService<Field>(
          client,
          Number(process.env.TIME_TO_EXPIRE_CACHE),
        ),
      inject: [REDIS_CLIENT],
    },
    {
      provide: ICACHE_PROPERTY,
      useFactory: (client: RedisClientType) =>
        new RedisService<Property>(
          client,
          Number(process.env.TIME_TO_EXPIRE_CACHE),
        ),
      inject: [REDIS_CLIENT],
    },
  ],
  exports: [REDIS_CLIENT, ICACHE_PRODUCER, ICACHE_PROPERTY, ICACHE_FIELD],
})
export class RedisModule {}
