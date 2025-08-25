import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteFieldCommand } from './DeleteFieldCommand';

export class DeleteFieldUseCase
  implements UseCase<DeleteFieldCommand, DeleteFieldOutput>
{
  private fieldRepository;
  constructor(fieldRepository) {
    this.fieldRepository = fieldRepository;
  }
  async execute(aCommand: DeleteFieldCommand): Promise<DeleteFieldOutput> {
    const fieldId = aCommand.fieldId;
    const field = await this.fieldRepository.findById(fieldId);
    if (!field) {
      throw new Error('Field dont exists');
    }
    field.deactivate();
    await this.fieldRepository.update(field);
    return;
  }
}

export type DeleteFieldOutput = void;
