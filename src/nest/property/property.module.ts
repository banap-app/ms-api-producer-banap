import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import { PropertyTypeOrmRepository } from '../../core/property/infrastructure/db/typeorm/PropertyTypeOrmRepository';
import { Repository } from 'typeorm';
import { CreatePropertyUseCase } from 'src/core/property/application/use-cases/create-property/CreatePropertyUseCase';
import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { ProducerEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { ProducerModule } from '../producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity]), ProducerModule],
  controllers: [PropertyController],
  providers: [
    {
      provide: PropertyTypeOrmRepository,
      useFactory: (repo: Repository<PropertyEntity>) => {
        return new PropertyTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(PropertyEntity)],
    },
    {
      provide: CreatePropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
      ) => new CreatePropertyUseCase(propertyRepo, producerRepo),
      inject: [PropertyTypeOrmRepository, ProducerTypeOrmRepository],
    },
  ],
})
export class PropertyModule {}
