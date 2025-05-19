import { Module } from '@nestjs/common';
import { FieldController } from './field.controller';
import { CreateFieldUseCase } from 'src/core/field/application/use-cases/create-field/CreateFieldUseCase';
import { Repository } from 'typeorm';
import { FieldEntity } from 'src/core/field/infrastructure/db/typeorm/FieldEntity';
import { FieldTypeOrmRepository } from 'src/core/field/infrastructure/db/typeorm/FieldTypeOrmRepository';
import { PropertyTypeOrmRepository } from 'src/core/property/infrastructure/db/typeorm/PropertyTypeOrmRepository';
import { ProducerTypeOrmRepository } from 'src/core/producer/infrastructure/db/typeorm/ProducerTypeOrmRepository';
import { ProducerEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import { FieldBoundaryEntity } from 'src/core/field/infrastructure/db/typeorm/FieldBoundaryEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProducerEntity,
      PropertyEntity,
      FieldEntity,
      FieldBoundaryEntity,
    ]),
  ],
  controllers: [FieldController],
  providers: [
    {
      provide: ProducerTypeOrmRepository,
      useFactory: (repo: Repository<ProducerEntity>) => {
        return new ProducerTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(ProducerEntity)],
    },
    {
      provide: PropertyTypeOrmRepository,
      useFactory: (repo: Repository<PropertyEntity>) => {
        return new PropertyTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(PropertyEntity)],
    },
    {
      provide: FieldTypeOrmRepository,
      useFactory: (repo: Repository<FieldEntity>) => {
        return new FieldTypeOrmRepository(repo);
      },
      inject: [getRepositoryToken(FieldEntity)],
    },
    {
      provide: CreateFieldUseCase,
      useFactory: (
        fieldRepo: FieldTypeOrmRepository,
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
      ) => new CreateFieldUseCase(fieldRepo, propertyRepo, producerRepo),
      inject: [
        FieldTypeOrmRepository,
        PropertyTypeOrmRepository,
        ProducerTypeOrmRepository,
      ],
    },
  ],
  exports: [FieldTypeOrmRepository],
})
export class FieldModule {}
