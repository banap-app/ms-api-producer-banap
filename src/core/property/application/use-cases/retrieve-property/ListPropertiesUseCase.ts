import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { ProducerRepository } from 'src/core/producer/domain/ProducerRepository';
import { ProducerId } from 'src/core/producer/domain/Producer';
import { ListPropertiesCommand } from './ListPropertiesCommand';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export type ListPropertiesOutput = PropertyOutput[];

export class ListPropertyUseCase
  implements UseCase<ListPropertiesCommand, ListPropertiesOutput>
{
  private propertyRespository: IPropertyRepository;
  private producerRepository: ProducerRepository;

  constructor(
    propertyRespository: IPropertyRepository,
    producerRepository: ProducerRepository,
  ) {
    this.propertyRespository = propertyRespository;
    this.producerRepository = producerRepository;
  }

  async execute(
    aCommand: ListPropertiesCommand,
  ): Promise<ListPropertiesOutput> {
    const producer = await this.producerRepository.findById(
      new ProducerId(aCommand.producerId),
    );
    if (!producer) {
      throw new NotFoundError('Producer not found');
    }

    const properties = await this.propertyRespository.findByProducerId(
      new ProducerId(aCommand.producerId),
    );

    return properties
      .filter((property) => property.getIsActive())
      .map((property) => PropertyOutputMapper.toOutput(property));
  }
}
