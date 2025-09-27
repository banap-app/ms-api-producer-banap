import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from '../../../../shared/application/IUseCase';
import { DeletePropertyCommand } from './DeletePropertyCommand';

import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { PropertyId } from 'src/core/property/domain/Property';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class DeletePropertyUseCase
  implements UseCase<DeletePropertyCommand, Boolean>
{
  private propertyRepository: IPropertyRepository;
  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository;
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

    return true;
  }
}
