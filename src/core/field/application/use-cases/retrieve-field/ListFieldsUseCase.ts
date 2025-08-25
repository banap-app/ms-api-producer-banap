import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { ListFieldsCommand } from './ListFieldsCommand';

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
      aCommand.propertyId,
    );
    if (!property) {
      throw new Error('Property not found');
    }

    const fields = await this.fieldRepository.findByPropertyId(
      aCommand.propertyId,
    );

    return fields
      .filter((field) => field.getIsActive())
      .map((field) => FieldOutputMapper.toOutput(field));
  }
}
