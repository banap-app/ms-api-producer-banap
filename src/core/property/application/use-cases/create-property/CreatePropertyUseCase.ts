import { UseCase } from '../../../../shared/application/IUseCase';
import { EntityValidationError } from '../../../../shared/domain/validators/ValidationErrors';
import { Property } from '../../../domain/Property';
import { IPropertyRepository } from '../../../domain/IPropertyRepository';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { CreatePropertyCommand } from './CreatePropertyCommand';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { ProducerId } from 'src/core/producer/domain/Producer';

export type CreatePropertyOutput = PropertyOutput;

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyCommand, CreatePropertyOutput>
{
  private propertyRepository: IPropertyRepository;
  private producerRepository: ProducerRepository;

  constructor(
    propertyRepository: IPropertyRepository,
    producerRepository: ProducerRepository,
  ) {
    this.propertyRepository = propertyRepository;
    this.producerRepository = producerRepository;
  }

  async execute(
    aCommand: CreatePropertyCommand,
  ): Promise<CreatePropertyOutput> {
    const aProperty = Property.create(aCommand);

    if (aProperty.notification.hasErrors()) {
      throw new EntityValidationError(aProperty.notification.toJSON());
    }

    const { producerId } = aCommand;

    const producerExists = await this.producerRepository.findById(
      new ProducerId(producerId),
    );

    if (!producerExists) {
      aProperty.notification.addError('Producer does not exist', 'producerId');
      throw new EntityValidationError(aProperty.notification.toJSON());
    }

    await this.propertyRepository.insert(aProperty);

    return PropertyOutputMapper.toOutput(aProperty);
  }
}
