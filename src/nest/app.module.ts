import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProducerEntity,
  ProfilePictureEntity,
  TypeUserEntity,
} from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerModule } from './producer/producer.module';
import { AnalysisEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisEntity';
import { AnalysisNpkEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisNpkEntity';
import { AnalysisLimingEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisLimingEntity';
import { AnalysisModule } from './analysis/analysis.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './authguard/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { AxiosModule } from './axios-module/axios.module';
import httpConfig from './config/httpConfig';
import { PropertyModule } from './property/property.module';
import { FieldEntity } from 'src/core/field/infrastructure/db/typeorm/FieldEntity';
import { FieldModule } from './field/field.module';
import { FieldBoundaryEntity } from 'src/core/field/infrastructure/db/typeorm/FieldBoundaryEntity';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [httpConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        FieldEntity,
        FieldBoundaryEntity,
        ProducerEntity,
        ProfilePictureEntity,
        PropertyEntity,
        TypeUserEntity,
        AnalysisEntity,
        AnalysisNpkEntity,
        AnalysisLimingEntity,
      ],
      synchronize: false,
    }),
    ProducerModule,
    AnalysisModule,
    PropertyModule,
    FieldModule,
    AxiosModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Reflector,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
