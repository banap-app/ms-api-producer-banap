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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'banap_database',
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
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [httpConfig],
    }),
    ProducerModule,
    AnalysisModule,
    PropertyModule,
    FieldModule,
    AxiosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Reflector,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
