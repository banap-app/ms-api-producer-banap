import { UseCase } from '../../../../shared/application/IUseCase';
import { EntityValidationError } from '../../../../shared/domain/validators/ValidationErrors';
import { Property } from '../../../domain/Property';
import { IPropertyRepository } from '../../../domain/IPropertyRepository';
import {
  PropertyOutput,
  PropertyOutputMapper,
} from '../../commons/PropertyOutputMapper';
import { CreatePropertyCommand } from './CreatePropertyCommand';

export type CreatePropertyOutput = PropertyOutput;

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyCommand, CreatePropertyOutput>
{
  private propertyRepository: IPropertyRepository;

  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(
    aCommand: CreatePropertyCommand,
  ): Promise<CreatePropertyOutput> {
    const aProperty = Property.create(aCommand);

    if (aProperty.notification.hasErrors()) {
      throw new EntityValidationError(aProperty.notification.toJSON());
    }

    await this.propertyRepository.insert(aProperty);

    return PropertyOutputMapper.toOutput(aProperty);
  }
}
