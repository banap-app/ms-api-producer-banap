import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { UseCase } from 'src/core/shared/application/IUseCase';
import { GetPropertyCommand } from './GetPropertyCommand';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { PropertyId } from 'src/core/property/domain/Property';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';

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
      throw new Error('Not found a Property');
    }

    property.validate([]);

    if (!property.getIsActive()) {
      throw new Error('Not found a Property');
    }

    if (property.notification.hasErrors()) {
      throw new EntityValidationError(property.notification.toJSON());
    }

    return PropertyOutputMapper.toOutput(property);
  }
}
