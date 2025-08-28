import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { UpdateFieldCommand } from './UpdateFieldcommand';
import { FieldId } from 'src/core/field/domain/Field';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { ProducerId } from 'src/core/producer/domain/Producer';

export class UpdateFieldUseCase
  implements UseCase<UpdateFieldCommand, UpdateFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private propertyRepository: IPropertyRepository;
  private producerRepository: ProducerRepository;

  constructor(
    fieldRepository: IFieldRepository,
    propertyRepository: IPropertyRepository,
    producerRepositroy: ProducerRepository,
  ) {
    this.fieldRepository = fieldRepository;
    this.propertyRepository = propertyRepository;
    this.producerRepository = producerRepositroy;
  }

  async execute(aCommand: UpdateFieldCommand): Promise<UpdateFieldOutput> {
    const field = await this.fieldRepository.findById(
      new FieldId(aCommand.fieldId),
    );
    if (!field) {
      throw new Error('Field not found');
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

    return FieldOutputMapper.toOutput(field);
  }
}

export type UpdateFieldOutput = FieldOutput;
