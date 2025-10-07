import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteFieldCommand } from './DeleteFieldCommand';
import { Field, FieldId } from 'src/core/field/domain/Field';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { ICache } from 'src/core/shared/application/ICache';

export class DeleteFieldUseCase
  implements UseCase<DeleteFieldCommand, DeleteFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private cacheAdapter: ICache<Field>;
  constructor(fieldRepository: IFieldRepository, cacheAdapter: ICache<Field>) {
    this.fieldRepository = fieldRepository;
    this.cacheAdapter = cacheAdapter;
  }
  async execute(aCommand: DeleteFieldCommand): Promise<DeleteFieldOutput> {
    const fieldId = aCommand.fieldId;

    const field = await this.fieldRepository.findById(new FieldId(fieldId));
    if (!field) {
      throw new NotFoundError('Field dont exists');
    }
    field.deactivate();

    await this.fieldRepository.update(field);
    await this.cacheAdapter.delete(`field:${field.getId}`);
    return;
  }
}

export type DeleteFieldOutput = void;
