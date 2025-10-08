import { AnalysisId } from 'src/core/analysis/domain/AnalysisId';
import { UseCase } from '../../../../shared/application/IUseCase';
import {
  AnalysisOutput,
  AnalysisOutputMapper,
} from '../../commons/AnalysisOutputMapper';
import { AnalysisRepository } from 'src/core/analysis/domain/AnalysisRepository';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';
import { Analysis } from 'src/core/analysis/domain/Analysis';
import {
  AnalysisLiming,
  AnalysisLimingId,
} from 'src/core/analysis/domain/AnalysisLiming';
import {
  AnalysisNpk,
  AnalysisNpkId,
} from 'src/core/analysis/domain/AnalysisNpk';
import { AnalysisConstructorProps } from '../../../domain/Analysis';
import { Potassium } from 'src/core/analysis/domain/value-objects/PotassiumVo';
import { Phosphor } from 'src/core/analysis/domain/value-objects/PhosporVo';
import { Nitrogen } from 'src/core/analysis/domain/value-objects/NitrogenVo';
import { ExpectedProductivity } from 'src/core/analysis/domain/value-objects/ExpectedProductivityVo';
import { CurrentBaseSaturation } from 'src/core/analysis/domain/value-objects/CurrentBaseSaturationVo';
import { DesiredBaseSaturation } from 'src/core/analysis/domain/value-objects/DesiredBaseSaturationVo';
import { RelativeTotalNeutralizingPower } from 'src/core/analysis/domain/value-objects/RelativeTotalNeutralizingPowerVo';
import { TotalCationExchangeCapacity } from 'src/core/analysis/domain/value-objects/TotalCationExchangeCapacityVo';
import { Liming } from 'src/core/analysis/domain/value-objects/LimingVo';
import { FieldId } from 'src/core/field/domain/Field';

export class GetAnalysisUseCase
  implements UseCase<GetAnalysisCommand, GetAnalysisOutput>
{
  private analysisRepository: AnalysisRepository;
  private cacheAdapter: ICache<Analysis>;

  constructor(
    analysisRepository: AnalysisRepository,
    cacheAdapter: ICache<Analysis>,
  ) {
    this.analysisRepository = analysisRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(aCommand: GetAnalysisCommand): Promise<AnalysisOutput> {
    const analysisId = new AnalysisId(aCommand.analysisId);

    if (await this.cacheAdapter.isCached(`analysis:${aCommand.analysisId}`)) {
      const analysisCached = await this.cacheAdapter.get(
        `analysis:${aCommand.analysisId}`,
      );
      let analysisType: AnalysisLiming | AnalysisNpk;

      if ('analysisLimingId' in analysisCached.typeAnalysis) {
        analysisType = new AnalysisLiming({
          analysisId: new AnalysisId(analysisCached.analysisId),
          analysisLimingId: new AnalysisLimingId(
            analysisCached.typeAnalysis.analysisLimingId,
          ),
          currentBaseSaturation: new CurrentBaseSaturation(
            analysisCached.typeAnalysis.currentBaseSaturation,
          ),
          desiredBaseSaturation: new DesiredBaseSaturation(
            analysisCached.typeAnalysis.desiredBaseSaturation,
          ),
          relativeTotalNeutralizingPower: new RelativeTotalNeutralizingPower(
            analysisCached.typeAnalysis.relativeTotalNeutralizingPower,
          ),
          totalCationExchangeCapacity: new TotalCationExchangeCapacity(
            analysisCached.typeAnalysis.totalCationExchangeCapacity,
          ),
          liming: new Liming(analysisCached.typeAnalysis.liming),
        });
      } else if ('analysisNpkId' in analysisCached.typeAnalysis) {
        analysisType = new AnalysisNpk({
          analysisId: new AnalysisId(analysisCached.analysisId),
          analysisNpkId: new AnalysisNpkId(analysisCached.analysisNpkId),
          expectedProductivity: new ExpectedProductivity(
            analysisCached.typeAnalysis.expectedProductivity,
          ),
          nitrogen: new Nitrogen(analysisCached.typeAnalysis.nitrogen),
          phosphor: new Phosphor(analysisCached.typeAnalysis.phosphor),
          potassium: new Potassium(analysisCached.typeAnalysis.potassium),
        });
      }
      const analysis = new Analysis({
        isActive: analysisCached.isActive,
        analysisId: new AnalysisId(analysisCached.analysisId),
        createdAt: analysisCached.createdAt,
        updatedAt: analysisCached.updatedAt,
        deletedAt: analysisCached.deletedAt,
        fieldId: new FieldId(analysisCached.fieldId),
        typeAnalysis: analysisType,
      });

      analysis.defineTypeOfAnalysis(analysisType);

      return AnalysisOutputMapper.toOutput(analysis);
    }
    const analysis = await this.analysisRepository.findById(analysisId);

    if (!analysis) {
      throw new NotFoundError(`Not Found Analysis with ID: ${analysisId}`);
    }

    await this.cacheAdapter.set(analysis);

    return AnalysisOutputMapper.toOutput(analysis);
  }
}
export type GetAnalysisCommand = { analysisId: string };
export type GetAnalysisOutput = AnalysisOutput;
