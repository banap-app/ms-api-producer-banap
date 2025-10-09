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
import { EngineerGateway } from 'src/core/others/infrastructure/gateway/EngineerGateway';

import { Property } from 'src/core/property/domain/Property';
import { ICache } from 'src/core/shared/application/ICache';
import { ICACHE_PROPERTY } from 'src/core/shared/infrastructure/di/tokens';

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
      provide: EngineerGateway,
      useFactory: () => {
        return new EngineerGateway();
      },
    },
    {
      provide: CreatePropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
        engineerGateway: EngineerGateway,
        cache: ICache<Property>,
      ) =>
        new CreatePropertyUseCase(
          propertyRepo,
          producerRepo,
          engineerGateway,
          cache,
        ),
      inject: [
        PropertyTypeOrmRepository,
        ProducerTypeOrmRepository,
        EngineerGateway,
        ICACHE_PROPERTY,
      ],
    },
    {
      provide: GetPropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        cache: ICache<Property>,
      ) => new GetPropertyUseCase(propertyRepo, cache),
      inject: [PropertyTypeOrmRepository, ICACHE_PROPERTY],
    },
    {
      provide: ListPropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
        cache: ICache<Property>,
      ) => new ListPropertyUseCase(propertyRepo, producerRepo, cache),
      inject: [
        PropertyTypeOrmRepository,
        ProducerTypeOrmRepository,
        ICACHE_PROPERTY,
      ],
    },
    {
      provide: DeletePropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        cache: ICache<Property>,
      ) => new DeletePropertyUseCase(propertyRepo, cache),
      inject: [PropertyTypeOrmRepository, ICACHE_PROPERTY],
    },
    {
      provide: UpdatePropertyUseCase,
      useFactory: (
        propertyRepo: PropertyTypeOrmRepository,
        cache: ICache<Property>,
      ) => new UpdatePropertyUseCase(propertyRepo, cache),
      inject: [PropertyTypeOrmRepository, ICACHE_PROPERTY],
    },
  ],
})
export class PropertyModule {}
