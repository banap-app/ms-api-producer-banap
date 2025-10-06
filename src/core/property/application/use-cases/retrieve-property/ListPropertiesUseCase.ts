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
import { Property } from 'src/core/property/domain/Property';
import { ICache } from 'src/core/shared/application/ICache';

export type ListPropertiesOutput = PropertyOutput[];
type propertyCached = {
  producerId: string;
  isActive: boolean;
  name: string;
  engineerId: string;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
export class ListPropertyUseCase
  implements UseCase<ListPropertiesCommand, ListPropertiesOutput>
{
  private propertyRespository: IPropertyRepository;
  private producerRepository: ProducerRepository;
  private cacheAdapter: ICache<Property>;

  constructor(
    propertyRespository: IPropertyRepository,
    producerRepository: ProducerRepository,
    cacheAdapter: ICache<Property>,
  ) {
    this.propertyRespository = propertyRespository;
    this.producerRepository = producerRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(
    aCommand: ListPropertiesCommand,
  ): Promise<ListPropertiesOutput> {
    if (await this.cacheAdapter.isCached(`property:${aCommand.producerId}`)) {
      let properties = await this.cacheAdapter.get(
        `property:${aCommand.producerId}`,
      );
      properties = properties.entityArray.map(
        (property:propertyCached) =>
          new Property({
            producerId: property.producerId,
            isActive: property.isActive,
            name: property.name,
            engineerId: property.engineerId,
            propertyId: property.propertyId,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
            deletedAt: property.deletedAt,
          }),
      );
      return properties.filter((property:Property) => property.getIsActive()).map((property:Property) => PropertyOutputMapper.toOutput(property))
    }

    const producer = await this.producerRepository.findById(
      new ProducerId(aCommand.producerId),
    );
    if (!producer) {
      throw new NotFoundError('Producer not found');
    }

    const properties = await this.propertyRespository.findByProducerId(
      new ProducerId(aCommand.producerId),
    );
    this.cacheAdapter.set({
      entityArray: properties,
      key: aCommand.producerId,
    });
    return properties
      .filter((property) => property.getIsActive())
      .map((property) => PropertyOutputMapper.toOutput(property));
  }
}
