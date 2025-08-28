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
import { ListFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/ListFieldsUseCase';
import { DeleteFieldUseCase } from 'src/core/field/application/use-cases/delete-field/DeleteFieldUseCase';
import { GetFieldUseCase } from 'src/core/field/application/use-cases/retrieve-field/GetFieldUseCase';
import { UpdateFieldUseCase } from 'src/core/field/application/use-cases/update-field/UpdateFieldUseCase';

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
    {
      provide: ListFieldUseCase,
      useFactory: (
        fieldRepo: FieldTypeOrmRepository,
        propertyRepo: PropertyTypeOrmRepository,
      ) => new ListFieldUseCase(fieldRepo, propertyRepo),
      inject: [FieldTypeOrmRepository, PropertyTypeOrmRepository],
    },
    {
      provide: GetFieldUseCase,
      useFactory: (fieldRepo: FieldTypeOrmRepository) =>
        new GetFieldUseCase(fieldRepo),
      inject: [FieldTypeOrmRepository],
    },
    {
      provide: DeleteFieldUseCase,
      useFactory: (fieldRepo: FieldTypeOrmRepository) =>
        new DeleteFieldUseCase(fieldRepo),
      inject: [FieldTypeOrmRepository],
    },
    {
      provide: UpdateFieldUseCase,
      useFactory: (
        fieldRepo: FieldTypeOrmRepository,
        propertyRepo: PropertyTypeOrmRepository,
        producerRepo: ProducerTypeOrmRepository,
      ) => new UpdateFieldUseCase(fieldRepo, propertyRepo, producerRepo),
      inject: [
        FieldTypeOrmRepository,
        PropertyTypeOrmRepository,
        ProducerTypeOrmRepository,
      ],
    },
  ],
  exports: [
    FieldTypeOrmRepository,
    PropertyTypeOrmRepository,
    ProducerTypeOrmRepository,
  ],
})
export class FieldModule {}
