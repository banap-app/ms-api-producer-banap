import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import { UpdatePropertyCommand } from './UpdatePropertyCommand';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export type UpdatePropertyOutput = PropertyOutput;

export class UpdatePropertyUseCase
  implements UseCase<UpdatePropertyCommand, UpdatePropertyOutput>
{
  private propertyRepository: IPropertyRepository;
  private cacheAdapter: ICache<Property>;

  constructor(
    propertyRepository: IPropertyRepository,
    cacheAdapter: ICache<Property>,
  ) {
    this.propertyRepository = propertyRepository;
    this.cacheAdapter = cacheAdapter;
  }
  async execute(
    aCommand: UpdatePropertyCommand,
  ): Promise<UpdatePropertyOutput> {
    const propertyToUpdate = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (
      await this.cacheAdapter.isCached(`property:${propertyToUpdate.getId}`)
    ) {
      const propertyCached = await this.cacheAdapter.get(
        `property:${propertyToUpdate.getId}`,
      );

      const property = new Property({
        isActive: propertyCached.isActive,
        name: propertyCached.name,
        producerId: propertyCached.producerId,
        createdAt: propertyCached.createdAt,
        deletedAt: propertyCached.deletedAt,
        engineerId: propertyCached.engineerId,
        propertyId: propertyCached.propertyId,
        updatedAt: propertyCached.updatedAt,
      });
      if (property.getName() == aCommand.propertyName) {
        return PropertyOutputMapper.toOutput(property);
      }
    }

    if (!propertyToUpdate) {
      throw new NotFoundError('Property not found');
    }

    propertyToUpdate.validate([]);

    if (propertyToUpdate.notification.hasErrors()) {
      throw new EntityValidationError(propertyToUpdate.notification.toJSON());
    }
    propertyToUpdate.changeName(aCommand.propertyName);

    await this.propertyRepository.update(propertyToUpdate);

    await this.cacheAdapter.set(propertyToUpdate);

    return PropertyOutputMapper.toOutput(propertyToUpdate);
  }
}
