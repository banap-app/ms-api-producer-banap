import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { ListFieldsCommand } from './ListFieldsCommand';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { PropertyId } from 'src/core/property/domain/Property';

export type ListFieldOutput = FieldOutput[];

export class ListFieldUseCase
  implements UseCase<ListFieldsCommand, ListFieldOutput>
{
  private fieldRepository;
  private propertyRepository;

  constructor(fieldRepository, propertyRepository) {
    this.fieldRepository = fieldRepository;
    this.propertyRepository = propertyRepository;
  }

  async execute(aCommand: ListFieldsCommand): Promise<ListFieldOutput> {
    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!property) {
      throw new NotFoundError('Property not found');
    }

    const fields = await this.fieldRepository.findByPropertyId(
      aCommand.propertyId,
    );

    return fields
      .filter((field) => field.getIsActive())
      .map((field) => FieldOutputMapper.toOutput(field));
  }
}
