import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from '../../../../shared/application/IUseCase';
import { DeletePropertyCommand } from './DeletePropertyCommand';

import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export class DeletePropertyUseCase
  implements UseCase<DeletePropertyCommand, Boolean>
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
  async execute(aCommand: DeletePropertyCommand): Promise<Boolean> {
    const propertyToDelete = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!propertyToDelete) {
      throw new Error('Not found a Property');
    }

    propertyToDelete.validate([]);

    if (!propertyToDelete.getIsActive()) {
      throw new NotFoundError('Not found a Property');
    }

    if (propertyToDelete.notification.hasErrors()) {
      throw new EntityValidationError(propertyToDelete.notification.toJSON());
    }

    await this.propertyRepository.delete(propertyToDelete.getId);
    await this.cacheAdapter.delete(
      `property:${propertyToDelete.getProducerId()}`,
    );

    return true;
  }
}
