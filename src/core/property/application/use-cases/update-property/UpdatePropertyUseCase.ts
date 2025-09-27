import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import { UpdatePropertyCommand } from './UpdatePropertyCommand';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { PropertyId } from 'src/core/property/domain/Property';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export type UpdatePropertyOutput = PropertyOutput;

export class UpdatePropertyUseCase
  implements UseCase<UpdatePropertyCommand, UpdatePropertyOutput>
{
  private propertyRepository: IPropertyRepository;

  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository;
  }
  async execute(
    aCommand: UpdatePropertyCommand,
  ): Promise<UpdatePropertyOutput> {
    const propertyToUpdate = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!propertyToUpdate) {
      throw new NotFoundError('Property not found');
    }

    propertyToUpdate.validate([]);

    if (propertyToUpdate.notification.hasErrors()) {
      throw new EntityValidationError(propertyToUpdate.notification.toJSON());
    }
    propertyToUpdate.changeName(aCommand.propertyName);

    await this.propertyRepository.update(propertyToUpdate);

    return PropertyOutputMapper.toOutput(propertyToUpdate);
  }
}
