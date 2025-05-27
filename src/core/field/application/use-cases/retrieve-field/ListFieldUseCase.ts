import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { ListFieldCommand } from './ListFieldCommand';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { PropertyId } from 'src/core/property/domain/Property';
import { FieldId } from 'src/core/field/domain/Field';

export type ListFieldOutput = FieldOutput[];

export class ListFieldUseCase
  implements UseCase<ListFieldCommand, ListFieldOutput>
{
  private propertyRepository: IPropertyRepository;
  private fieldRepository: IFieldRepository;

  constructor(
    propertyRepository: IPropertyRepository,
    fieldRepository: IFieldRepository,
  ) {
    this.propertyRepository = propertyRepository;
    this.fieldRepository = fieldRepository;
  }
  async execute(aCommand: ListFieldCommand): Promise<ListFieldOutput> {
    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!property) {
      throw new Error('Not found a Property');
    }

    const fields = await this.fieldRepository.findAllByPropertyId(
      new FieldId(aCommand.propertyId),
    );

    return fields
      .filter((field) => field.getIsActive())
      .map((field) => FieldOutputMapper.toOutput(field));
  }
}
