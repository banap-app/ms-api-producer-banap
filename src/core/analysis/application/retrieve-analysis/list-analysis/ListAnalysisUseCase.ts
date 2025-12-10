import { UseCase } from 'src/core/shared/application/IUseCase';
import { ListAnalysisCommand } from './ListAnalysisCommand';
import { ListAnalysisOutput } from './ListAnalysisOutput';
import { AnalysisRepository } from 'src/core/analysis/domain/AnalysisRepository';
import { FieldId } from 'src/core/field/domain/Field';
import { AnalysisOutputMapper } from '../../commons/AnalysisOutputMapper';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';
import { Analysis } from 'src/core/analysis/domain/Analysis';
import {
  AnalysisNpk,
  AnalysisNpkId,
} from 'src/core/analysis/domain/AnalysisNpk';
import {
  AnalysisLiming,
  AnalysisLimingId,
} from 'src/core/analysis/domain/AnalysisLiming';
import { Liming } from 'src/core/analysis/domain/value-objects/LimingVo';
import { RelativeTotalNeutralizingPower } from 'src/core/analysis/domain/value-objects/RelativeTotalNeutralizingPowerVo';
import { TotalCationExchangeCapacity } from 'src/core/analysis/domain/value-objects/TotalCationExchangeCapacityVo';
import { DesiredBaseSaturation } from 'src/core/analysis/domain/value-objects/DesiredBaseSaturationVo';
import { CurrentBaseSaturation } from 'src/core/analysis/domain/value-objects/CurrentBaseSaturationVo';
import { AnalysisId } from 'src/core/analysis/domain/AnalysisId';
import { ExpectedProductivity } from 'src/core/analysis/domain/value-objects/ExpectedProductivityVo';
import { Nitrogen } from 'src/core/analysis/domain/value-objects/NitrogenVo';
import { Phosphor } from 'src/core/analysis/domain/value-objects/PhosporVo';
import { Potassium } from 'src/core/analysis/domain/value-objects/PotassiumVo';

export class ListAnalysisUseCase
  implements UseCase<ListAnalysisCommand, ListAnalysisOutput>
{
  private analysisRepository: AnalysisRepository;
  private fieldRepository: IFieldRepository;
  private cacheAdapter: ICache<Analysis>;

  constructor(
    analysisRepository: AnalysisRepository,
    fieldRepository: IFieldRepository,
    cacheAdapter: ICache<Analysis>,
  ) {
    this.analysisRepository = analysisRepository;
    this.fieldRepository = fieldRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(aCommand: ListAnalysisCommand): Promise<ListAnalysisOutput> {
    const id = new FieldId(aCommand.fieldId);

    if (await this.cacheAdapter.isCached(`analysis:${aCommand.fieldId}`)) {
      const analysisCached = await this.cacheAdapter.get(
        `analysis:${aCommand.fieldId}`,
      );

      const analysis = analysisCached.entityArray
        .filter((analysis: Analysis) => analysis.getIsActive())
        .map((analysis) => {
          let analysisType: AnalysisNpk | AnalysisLiming;
          if ('analysisLimingId' in analysis.typeAnalysis) {
            analysisType = new AnalysisLiming({
              analysisId: new AnalysisId(analysis.analysisId),
              analysisLimingId: new AnalysisLimingId(
                analysis.typeAnalysis.analysisLimingId,
              ),
              currentBaseSaturation: new CurrentBaseSaturation(
                analysis.typeAnalysis.currentBaseSaturation,
              ),
              desiredBaseSaturation: new DesiredBaseSaturation(
                analysis.typeAnalysis.desiredBaseSaturation,
              ),
              liming: new Liming(analysis.typeAnalysis.liming),
              relativeTotalNeutralizingPower:
                new RelativeTotalNeutralizingPower(
                  analysis.typeAnalysis.relativeTotalNeutralizingPower,
                ),
              totalCationExchangeCapacity: new TotalCationExchangeCapacity(
                analysis.typeAnalysis.totalCationExchangeCapacity,
              ),
            });
          } else if ('analysisNpkId' in analysis.typeAnalysis) {
            analysisType = new AnalysisNpk({
              analysisId: new AnalysisId(analysis.typeAnalysis.analysisId),
              analysisNpkId: new AnalysisNpkId(
                analysis.typeAnalysis.analysisNpkId.id,
              ),
              expectedProductivity: new ExpectedProductivity(
                analysis.typeAnalysis.expectedProductivity,
              ),
              nitrogen: new Nitrogen(analysis.typeAnalysis.nitrogen),
              phosphor: new Phosphor(analysis.typeAnalysis.phosphor),
              potassium: new Potassium(analysis.typeAnalysis.potassium),
            });
          }

          const analysisEntity = new Analysis({
            isActive: analysisCached.isActive,
            analysisId: new AnalysisId(analysisCached.analysisId),
            createdAt: analysisCached.createdAt,
            updatedAt: analysisCached.updatedAt,
            deletedAt: analysisCached.deletedAt,
            fieldId: new FieldId(analysisCached.fieldId),
            typeAnalysis: analysisType,
          });

          analysisEntity.defineTypeOfAnalysis(analysisType);

          return AnalysisOutputMapper.toOutput(analysisEntity);
        });
      analysis.filter();
    }

    const field = await this.fieldRepository.findById(id);

    if (!field) {
      throw new Error('Not found a Field');
    }

    field.validate();

    if (field.notification.hasErrors()) {
      throw new EntityValidationError(field.notification.toJSON());
    }

    let analysis = await this.analysisRepository.findAllByFieldId(field.getId);

    if (!analysis) {
      throw new NotFoundError('Not exists analysis');
    }

    const analysisValidated = analysis.map((e) => {
      e.validate();
      if (e.notification.hasErrors()) {
        throw new Error(e.notification.toJSON());
      }
    });
    await this.cacheAdapter.set({ entityArray: analysis, key: id.getId });
    analysis = analysis.filter((analysis) => analysis.getIsActive() == true);
    return {
      count: analysis.length,
      analysis: analysis.map((e) => {
        return AnalysisOutputMapper.toOutput(e);
      }),
    };
  }
}
