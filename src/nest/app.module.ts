import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { ProducerEntity, ProfilePictureEntity, TypeUserEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
=======
import {
  ProducerEntity,
  ProfilePictureEntity,
} from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerController } from './producer/producer.controller';
>>>>>>> f03c679ba8cddfa4f52e02419ff1c9ce85e3bcdc
import { ProducerModule } from './producer/producer.module';
import { PropertyModule } from './property/property.module';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';

@Module({
<<<<<<< HEAD
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
=======
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'banap_database',
      entities: [ProducerEntity, ProfilePictureEntity, PropertyEntity],
      synchronize: true,
    }),
    ProducerModule,
    PropertyModule,
  ],
>>>>>>> f03c679ba8cddfa4f52e02419ff1c9ce85e3bcdc
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
