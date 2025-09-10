import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import { PropertyTypeOrmRepository } from '../../core/property/infrastructure/db/typeorm/PropertyTypeOrmRepository';
import { Repository } from 'typeorm';
import { CreatePropertyUseCase } from 'src/core/property/application/use-cases/create-property/CreatePropertyUseCase';
import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { ProducerModule } from '../producer/producer.module';
import { GetPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/GetPropertyUseCase';
import { ListPropertyUseCase } from 'src/core/property/application/use-cases/retrieve-property/ListPropertiesUseCase';
import { DeletePropertyUseCase } from 'src/core/property/application/use-cases/delete-property/DeletePropertyUseCase';
import { UpdatePropertyUseCase } from '../../core/property/application/use-cases/update-property/UpdatePropertyUseCase';

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
    {
      provide: GetPropertyUseCase,
      useFactory: (propertyRepo: PropertyTypeOrmRepository) =>
        new GetPropertyUseCase(propertyRepo),
      inject: [PropertyTypeOrmRepository],
    },
    {
      provide: ListPropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
      ) => new ListPropertyUseCase(propertyRepo, producerRepo),
      inject: [PropertyTypeOrmRepository, ProducerTypeOrmRepository],
    },
    {
      provide: DeletePropertyUseCase,
      useFactory: (propertyRepo: PropertyTypeOrmRepository) =>
        new DeletePropertyUseCase(propertyRepo),
      inject: [PropertyTypeOrmRepository],
    },
    {
      provide: UpdatePropertyUseCase,
      useFactory: (propertyRepo: PropertyTypeOrmRepository) =>
        new UpdatePropertyUseCase(propertyRepo),
      inject: [PropertyTypeOrmRepository],
    },
  ],
})
export class PropertyModule {}
