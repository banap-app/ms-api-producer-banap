import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { UpdateFieldCommand } from './UpdateFieldcommand';
import { Field, FieldId } from 'src/core/field/domain/Field';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { ProducerId } from 'src/core/producer/domain/Producer';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export class UpdateFieldUseCase
  implements UseCase<UpdateFieldCommand, UpdateFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private propertyRepository: IPropertyRepository;
  private producerRepository: ProducerRepository;
  private cacheAdapter: ICache<Field>;

  constructor(
    fieldRepository: IFieldRepository,
    propertyRepository: IPropertyRepository,
    producerRepositroy: ProducerRepository,
    cacheAdapter: ICache<Field>,
  ) {
    this.fieldRepository = fieldRepository;
    this.propertyRepository = propertyRepository;
    this.producerRepository = producerRepositroy;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(aCommand: UpdateFieldCommand): Promise<UpdateFieldOutput> {
    const field = await this.fieldRepository.findById(
      new FieldId(aCommand.fieldId),
    );
    if (!field) {
      throw new NotFoundError('Field not found');
    }
    if (await this.cacheAdapter.isCached(`field:${aCommand.fieldId}`)) {
      const fieldCached = await this.cacheAdapter.get(
        `field:${aCommand.fieldId}`,
      );

      const field = new Field({
        name: fieldCached.name,
        crop: fieldCached.crop,
        description: fieldCached.description,
        fieldBoundary: fieldCached.fieldBoundary.points,
        isActive: fieldCached.isActive,
        producerId: fieldCached.producerId,
        propertyId: fieldCached.propertyId,
        createdAt: fieldCached.createdAt,
        updatedAt: fieldCached.updatedAt,
        deletedAt: fieldCached.deletedAt,
        fieldId: fieldCached.fieldId,
      });

      if(field.getName() == aCommand.name && field.getCrop() == aCommand.crop && field.getDescription() == aCommand.description && field.getName() == aCommand.name) {
        return FieldOutputMapper.toOutput(field)
      }
    }

    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!property) {
      throw new Error(field.notification.toJSON());
    }

    const producer = await this.producerRepository.findById(
      new ProducerId(aCommand.producerId),
    );
    if (!producer) {
      throw new Error(field.notification.toJSON());
    }

    field.changeName(aCommand.name);
    field.changeDescription(aCommand.description);
    field.changeCrop(aCommand.crop);
    field.changeFieldBoundary(aCommand.fieldBoundary);

    field.validate();

    if (field.notification.hasErrors()) {
      throw new Error(field.notification.toJSON());
    }

    await this.fieldRepository.update(field);
    await this.cacheAdapter.set(field)
    return FieldOutputMapper.toOutput(field);
  }
}

export type UpdateFieldOutput = FieldOutput;
