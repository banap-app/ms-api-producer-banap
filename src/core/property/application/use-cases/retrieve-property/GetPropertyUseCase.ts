import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import { GetPropertyCommand } from './GetPropertyCommand';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export type GetPropertyOutput = PropertyOutput;

export class GetPropertyUseCase
  implements UseCase<GetPropertyCommand, GetPropertyOutput>
{
  private propertyRepository: IPropertyRepository;
  private cacheAdapter: ICache<Property>

  constructor(propertyRepository: IPropertyRepository, cacheAdapter: ICache<Property>) {
    this.propertyRepository = propertyRepository;
    this.cacheAdapter = cacheAdapter
  }

  async execute(aCommand: GetPropertyCommand): Promise<GetPropertyOutput> {

    if (await this.cacheAdapter.isCached(`property:${aCommand.propertyId}`)) {
      const propertyCached = await this.cacheAdapter.get(`property:${aCommand.propertyId}`)
      const property = new Property({
        name: propertyCached.name,
        isActive: propertyCached.isActive,
        producerId: propertyCached.producerId,
        createdAt: propertyCached.createdAt,
        updatedAt: propertyCached.updatedAt,
        deletedAt: propertyCached.deletedAt,
        engineerId: propertyCached.engineerId,
        propertyId: propertyCached.propertyId
      })
      return PropertyOutputMapper.toOutput(property)
    }

    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );
    if (!property) {
      throw new NotFoundError(
        `Not found a Property with ID: ${aCommand.propertyId}`,
      );
    }

    property.validate([]);

    if (!property.getIsActive()) {
      throw new NotFoundError(
        `Not found a Property with ID: ${aCommand.propertyId}`,
      );
    }

    if (property.notification.hasErrors()) {
      throw new EntityValidationError(property.notification.toJSON());
    }
    
    await this.cacheAdapter.set(property)
    
    return PropertyOutputMapper.toOutput(property);
  }
}
