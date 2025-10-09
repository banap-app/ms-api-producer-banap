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
import { IEngineerRepository } from 'src/core/others/domain/IEngineerRepository';
import { EngineerId } from 'src/core/others/domain/SimpleEngineer';
import { ICache } from 'src/core/shared/application/ICache';

export type CreatePropertyOutput = PropertyOutput;

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyCommand, CreatePropertyOutput>
{
  private propertyRepository: IPropertyRepository;
  private producerRepository: ProducerRepository;
  private engineerRepository: IEngineerRepository;
  private cacheAdapter: ICache<Property>;

  constructor(
    propertyRepository: IPropertyRepository,
    producerRepository: ProducerRepository,
    engineerRepository: IEngineerRepository,
    cacheAdapter: ICache<Property>,
  ) {
    this.propertyRepository = propertyRepository;
    this.producerRepository = producerRepository;
    this.engineerRepository = engineerRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(
    aCommand: CreatePropertyCommand,
  ): Promise<CreatePropertyOutput> {
    const aProperty = Property.create(aCommand);

    if (aProperty.notification.hasErrors()) {
      throw new EntityValidationError(aProperty.notification.toJSON());
    }

    const { producerId, engineerId } = aCommand;

    const producerExists = await this.producerRepository.findById(
      new ProducerId(producerId),
    );

    if (
      engineerId &&
      (await this.engineerRepository.findById(new EngineerId(engineerId)))
    ) {
      aProperty.aggregateEngineer(new EngineerId(engineerId));
    }

    if (!producerExists) {
      aProperty.notification.addError('Producer does not exist', 'producerId');

      throw new EntityValidationError(aProperty.notification.toJSON());
    }

    await this.propertyRepository.insert(aProperty);
    await this.cacheAdapter.delete(`property:${aCommand.producerId}`);
    return PropertyOutputMapper.toOutput(aProperty);
  }
}
