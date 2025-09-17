import { AnalysisId } from 'src/core/analysis/domain/AnalysisId';
import { UseCase } from '../../../../shared/application/IUseCase';
import {
  AnalysisOutput,
  AnalysisOutputMapper,
} from '../../commons/AnalysisOutputMapper';
import { AnalysisRepository } from 'src/core/analysis/domain/AnalysisRepository';

export class GetAnalysisUseCase
  implements UseCase<GetAnalysisCommand, GetAnalysisOutput>
{
  private analysisRepository: AnalysisRepository;

  constructor(analysisRepository: AnalysisRepository) {
    this.analysisRepository = analysisRepository;
  }

  async execute(aCommand: GetAnalysisCommand): Promise<AnalysisOutput> {
    const analysisId = new AnalysisId(aCommand.analysisId);
    console.log(analysisId);
    const analysis = await this.analysisRepository.findById(analysisId);
    return AnalysisOutputMapper.toOutput(analysis);
  }
}
export type GetAnalysisCommand = { analysisId: string };
export type GetAnalysisOutput = AnalysisOutput;
