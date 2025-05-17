import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity, ProfilePictureEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerController } from './producer/producer.controller';
import { ProducerModule } from './producer/producer.module';
import { AnalysisEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisEntity';
import { AnalysisNpkEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisNpkEntity';
import { AnalysisLimingEntity } from 'src/core/analysis/infrastructure/db/typeorm/AnalysisLimingEntity';
import { AnalysisModule } from './analysis/analysis.module';
import { AnalysisController } from './analysis/analysis.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "banap",
    entities: [ProducerEntity, ProfilePictureEntity, AnalysisEntity, AnalysisNpkEntity, AnalysisLimingEntity],
    synchronize: true
  }), ProducerModule, AnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
