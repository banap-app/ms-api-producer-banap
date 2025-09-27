import { AnalysisId } from 'src/core/analysis/domain/AnalysisId';
import { UseCase } from '../../../../shared/application/IUseCase';
import {
  AnalysisOutput,
  AnalysisOutputMapper,
} from '../../commons/AnalysisOutputMapper';
import { AnalysisRepository } from 'src/core/analysis/domain/AnalysisRepository';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';

export class GetAnalysisUseCase
  implements UseCase<GetAnalysisCommand, GetAnalysisOutput>
{
  private analysisRepository: AnalysisRepository;

  constructor(analysisRepository: AnalysisRepository) {
    this.analysisRepository = analysisRepository;
  }

  async execute(aCommand: GetAnalysisCommand): Promise<AnalysisOutput> {
    const analysisId = new AnalysisId(aCommand.analysisId);
    const analysis = await this.analysisRepository.findById(analysisId);

    if (!analysis) {
      throw new NotFoundError(`Not Found Analysis with ID: ${analysisId}`);
    }
    console.log(analysis.getIsActive());
    console.log(analysis);

    return AnalysisOutputMapper.toOutput(analysis);
  }
}
export type GetAnalysisCommand = { analysisId: string };
export type GetAnalysisOutput = AnalysisOutput;
