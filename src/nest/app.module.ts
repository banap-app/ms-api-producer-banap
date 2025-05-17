import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity, ProfilePictureEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "banap_database",
    entities: [ProducerEntity, ProfilePictureEntity, AnalysisEntity, AnalysisNpkEntity, AnalysisLimingEntity],
    synchronize: true
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [httpConfig]
  }),
  ProducerModule,
  AnalysisModule,
AxiosModule],
  controllers: [AppController],
  providers: [AppService,Reflector,
    { provide: APP_GUARD, useClass: AuthGuard },],
})
export class AppModule {}
