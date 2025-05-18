import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerModule } from './producer/producer.module';
import { PropertyModule } from './property/property.module';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import { ProducerEntity, ProfilePictureEntity, TypeUserEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "banap_database",
    entities: [ProducerEntity, ProfilePictureEntity, TypeUserEntity],
    synchronize: false
  }), ProducerModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
