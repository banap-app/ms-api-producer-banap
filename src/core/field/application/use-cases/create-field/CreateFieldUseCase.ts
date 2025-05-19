import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { CreateFieldCommand } from './CreateFieldCommand';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { PropertyId } from 'src/core/property/domain/Property';
import { Field } from 'src/core/field/domain/Field';

export type CreateFieldOutput = FieldOutput;

export class CreateFieldUseCase
  implements UseCase<CreateFieldCommand, CreateFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private propertyRepository: IPropertyRepository;
  private producerRepository: ProducerRepository;

  constructor(
    fieldRepository: IFieldRepository,
    propertyRepository: IPropertyRepository,
    producerRepository: ProducerRepository,
  ) {
    this.fieldRepository = fieldRepository;
    this.propertyRepository = propertyRepository;
    this.producerRepository = producerRepository;
  }

  async execute(aCommand: CreateFieldCommand): Promise<FieldOutput> {

    const aField = Field.create(aCommand);

    if (aField.notification.hasErrors()) {
      throw new Error(aField.notification.toJSON());
    }
    
    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!property) {
      aField.notification.addError('Property does not exist', 'propertyId');
      throw new Error(aField.notification.toJSON());
    }
    const producer = await this.producerRepository.findById(
      new PropertyId(aCommand.producerId),
    );

    if (!producer) {
      aField.notification.addError('Producer does not exist', 'producerId');
      throw new Error(aField.notification.toJSON());
    }

    await this.fieldRepository.insert(aField);

    return FieldOutputMapper.toOutput(aField);
  }
}
