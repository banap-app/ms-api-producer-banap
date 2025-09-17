import { UseCase } from 'src/core/shared/application/IUseCase';
import { DeleteAnalysisCommand } from './DeleteAnalysisCommand';
import { AnalysisRepository } from '../../domain/AnalysisRepository';
import { AnalysisId } from '../../domain/AnalysisId';

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
      throw new Error('Analysis not found');
    }

    analysisToDelete.validate([]);

    if (analysisToDelete.notification.hasErrors()) {
      throw new Error(analysisToDelete.notification.toJSON());
    }
    return true;
  }
}
