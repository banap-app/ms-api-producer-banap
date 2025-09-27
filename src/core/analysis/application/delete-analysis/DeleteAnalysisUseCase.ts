import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteAnalysisCommand } from './DeleteAnalysisCommand';
import { AnalysisRepository } from '../../domain/AnalysisRepository';
import { AnalysisId } from '../../domain/AnalysisId';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class DeleteAnalysisUseCase
  implements UseCase<DeleteAnalysisCommand, Boolean>
{
  private analysisRepository: AnalysisRepository;

  constructor(analysisRepository: AnalysisRepository) {
    this.analysisRepository = analysisRepository;
  }

  async execute(aCommand: DeleteAnalysisCommand): Promise<Boolean> {
    const analysisToDelete = await this.analysisRepository.findById(
      new AnalysisId(aCommand.analysisId),
    );

    if (!analysisToDelete) {
      throw new NotFoundError('Analysis not found');
    }

    analysisToDelete.validate([]);

    if (analysisToDelete.notification.hasErrors()) {
      throw new Error(analysisToDelete.notification.toJSON());
    }

    analysisToDelete.deactivate();

    await this.analysisRepository.update(analysisToDelete);

    return;
  }
}
