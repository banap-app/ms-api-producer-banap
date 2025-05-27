import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { GetFieldCommand } from './GetFieldCommand';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { FieldId } from 'src/core/field/domain/Field';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';

export type GetFieldOutput = FieldOutput;

export class GetFieldUseCase
  implements UseCase<GetFieldCommand, GetFieldOutput>
{
  private fieldRepository: IFieldRepository;

  constructor(fieldRepository: IFieldRepository) {
    this.fieldRepository = fieldRepository;
  }

  async execute(aCommand: GetFieldCommand): Promise<FieldOutput> {
    const field = await this.fieldRepository.findById(
      new FieldId(aCommand.fieldId),
    );

    if (!field) {
      throw new Error('Not found a Field');
    }

    if (!field.getIsActive()) {
      throw new Error('Not found a Field');
    }

    if (field.notification.hasErrors()) {
      throw new EntityValidationError(field.notification.toJSON());
    }

    return FieldOutputMapper.toOutput(field);
  }
}
