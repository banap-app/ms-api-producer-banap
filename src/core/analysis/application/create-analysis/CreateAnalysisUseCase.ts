import { UseCase } from '../../../shared/application/IUseCase';
import { CreateAnalysisCommand } from './CreateAnalysisCommand';
import { AnalysisRepository } from '../../domain/AnalysisRepository';
import { Analysis } from '../../domain/Analysis';
import { EntityValidationError } from '../../../shared/domain/validators/ValidationErrors';
import {
  AnalysisOutput,
  AnalysisOutputMapper,
} from '../commons/AnalysisOutputMapper';
import {
  AnalysisLiming,
  AnalysisLimingCreateProps,
} from '../../domain/AnalysisLiming';
import { AnalysisNpk } from '../../domain/AnalysisNpk';
import {
  DesiredBaseSaturation,
  CurrentBaseSaturation,
  TotalCationExchangeCapacity,
  RelativeTotalNeutralizingPower,
} from '../../domain/value-objects/indexVo';
import {
  Phosphor,
  Potassium,
  ExpectedProductivity,
} from '../../domain/value-objects/indexVo';
import { FieldId } from 'src/core/field/domain/Field';

export class CreateAnalysisUseCase
  implements UseCase<CreateAnalysisCommand, CreateAnalysisOutput>
{
  constructor(private analysisRepository: AnalysisRepository) {}

  async execute(
    aCommand: CreateAnalysisCommand,
  ): Promise<CreateAnalysisOutput> {
    const anAnalysis = Analysis.create({
      fieldId: new FieldId(aCommand.fieldId),
      isActive: aCommand.isActive,
    });
    const typeAnalysis = this.resolveTypeAnalysis(aCommand, anAnalysis.getId);

    anAnalysis.defineTypeOfAnalysis(typeAnalysis);

    if (anAnalysis.notification.hasErrors()) {
      throw new EntityValidationError(anAnalysis.notification.toJSON());
    }

    const existsAnalysis = await this.analysisRepository.findById(
      anAnalysis.getId,
    );
    if (existsAnalysis) {
      throw new Error('Exists an Analysis');
    }

    await anAnalysis.calculate();

    await this.analysisRepository.insert(anAnalysis);

    return AnalysisOutputMapper.toOutput(anAnalysis);
  }

  private resolveTypeAnalysis(
    aCommand: CreateAnalysisCommand,
    analysisId,
  ): AnalysisLiming | AnalysisNpk {
    let typeAnalysis = aCommand.typeAnalysis;

    if (
      ('desiredBaseSaturation' in typeAnalysis ||
        !('desiredBaseSaturation' in typeAnalysis)) &&
      'currentBaseSaturation' in typeAnalysis &&
      'totalCationExchangeCapacity' in typeAnalysis &&
      'relativeTotalNeutralizingPower' in typeAnalysis
    ) {
      return AnalysisLiming.create({
        analysisId,
        desiredBaseSaturation: typeAnalysis.desiredBaseSaturation
          ? new DesiredBaseSaturation(typeAnalysis.desiredBaseSaturation)
          : null,
        currentBaseSaturation: new CurrentBaseSaturation(
          typeAnalysis.currentBaseSaturation,
        ),
        totalCationExchangeCapacity: new TotalCationExchangeCapacity(
          typeAnalysis.totalCationExchangeCapacity,
        ),
        relativeTotalNeutralizingPower: new RelativeTotalNeutralizingPower(
          typeAnalysis.relativeTotalNeutralizingPower,
        ),
      });
    }

    if (
      'expectedProductivity' in typeAnalysis ||
      'phosphor' in typeAnalysis ||
      'potassium' in typeAnalysis
    ) {
      return AnalysisNpk.create({
        analysisId,
        expectedProductivity: typeAnalysis.expectedProductivity
          ? new ExpectedProductivity(typeAnalysis.expectedProductivity)
          : undefined,
        phosphor: typeAnalysis.phosphor
          ? new Phosphor(typeAnalysis.phosphor)
          : undefined,
        potassium: typeAnalysis.potassium
          ? new Potassium(typeAnalysis.potassium)
          : undefined,
      });
    }

    throw new Error('Invalid or missing typeAnalysis data');
  }
}

export type CreateAnalysisOutput = AnalysisOutput;
