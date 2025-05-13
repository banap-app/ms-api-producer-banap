import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity, ProfilePictureEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerController } from './producer/producer.controller';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "banap_database",
    entities: [ProducerEntity, ProfilePictureEntity],
    synchronize: true
  }), ProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
