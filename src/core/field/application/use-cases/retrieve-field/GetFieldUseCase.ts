import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { FieldId } from 'src/core/field/domain/Field';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class GetFieldUseCase
  implements UseCase<GetFieldCommand, GetFieldOutput>
{
  private fieldRepository: IFieldRepository;
  constructor(fieldRepository: IFieldRepository) {
    this.fieldRepository = fieldRepository;
  }

  async execute(aCommand: GetFieldCommand): Promise<GetFieldOutput> {
    const field = await this.fieldRepository.findById(
      new FieldId(aCommand.fieldId),
    );
    if (!field) {
      throw new NotFoundError(`Not found a Field with ID: ${aCommand.fieldId}`);
    }

    field.validate();

    if (!field.getIsActive()) {
      throw new NotFoundError(`Not found a Field with ID: ${aCommand.fieldId}`);
    }
    if (field.notification.hasErrors()) {
      throw new EntityValidationError(field.notification.toJSON());
    }

    return FieldOutputMapper.toOutput(field);
  }
}

export type GetFieldCommand = { fieldId: string };
export type GetFieldOutput = FieldOutput;
