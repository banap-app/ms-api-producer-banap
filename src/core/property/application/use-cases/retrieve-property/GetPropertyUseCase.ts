import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import { GetPropertyCommand } from './GetPropertyCommand';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { PropertyId } from 'src/core/property/domain/Property';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export type GetPropertyOutput = PropertyOutput;

export class GetPropertyUseCase
  implements UseCase<GetPropertyCommand, GetPropertyOutput>
{
  private propertyRespository: IPropertyRepository;

  constructor(propertyRespository: IPropertyRepository) {
    this.propertyRespository = propertyRespository;
  }

  async execute(aCommand: GetPropertyCommand): Promise<GetPropertyOutput> {
    const property = await this.propertyRespository.findById(
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

    return PropertyOutputMapper.toOutput(property);
  }
}
