import { AnalysisEntity } from './AnalysisEntity';
import { Analysis } from '../../../../analysis/domain/Analysis';
import { AnalysisId } from '../../../domain/AnalysisId';
import { FieldId } from '../../../../field/domain/Field';
import {
  AnalysisLiming,
  AnalysisLimingId,
} from '../../../../analysis/domain/AnalysisLiming';
import {
  AnalysisNpk,
  AnalysisNpkId,
} from '../../../../analysis/domain/AnalysisNpk';
import { AnalysisLimingEntity } from './AnalysisLimingEntity';
import { AnalysisNpkEntity } from './AnalysisNpkEntity';
import { Phosphor } from 'src/core/analysis/domain/value-objects/PhosporVo';
import { Potassium } from 'src/core/analysis/domain/value-objects/PotassiumVo';
import { ExpectedProductivity } from 'src/core/analysis/domain/value-objects/ExpectedProductivityVo';
import { Nitrogen } from 'src/core/analysis/domain/value-objects/NitrogenVo';
import { DesiredBaseSaturation } from 'src/core/analysis/domain/value-objects/DesiredBaseSaturationVo';
import { CurrentBaseSaturation } from 'src/core/analysis/domain/value-objects/CurrentBaseSaturationVo';
import { TotalCationExchangeCapacity } from 'src/core/analysis/domain/value-objects/TotalCationExchangeCapacityVo';
import { RelativeTotalNeutralizingPower } from 'src/core/analysis/domain/value-objects/RelativeTotalNeutralizingPowerVo';
import { Liming } from 'src/core/analysis/domain/value-objects/LimingVo';

export class AnalysisEntityMapper {
  static toTypeEntity(analysis: Analysis): AnalysisEntity {
    const entity = new AnalysisEntity();
    entity.analysisId = analysis.getId.id;
    entity.fieldId = analysis.getFieldId().id;
    entity.isActive = analysis.getIsActive();
    entity.createdAt = analysis.getCreatedAt();
    entity.updatedAt = analysis.getUpdatedAt();
    entity.deletedAt = analysis.getDeletedAt();

    const typeAnalysis = analysis.getTypeAnalysis();

    if (typeAnalysis instanceof AnalysisLiming) {
      const liming = new AnalysisLimingEntity();
      liming.analysisLimingId = typeAnalysis.getId.id;
      liming.analysis = entity;
      liming.desiredBaseSaturation =
        typeAnalysis.getDesiredBaseSaturation().getValue;
      liming.currentBaseSaturation =
        typeAnalysis.getCurrentBaseSaturation().getValue;
      liming.totalCationExchangeCapacity =
        typeAnalysis.getTotalCationExchangeCapacity().getValue;
      liming.relativeTotalNeutralizingPower =
        typeAnalysis.getRelativeTotalNeutralizingPower().getValue;
      liming.liming = typeAnalysis.getLiming().getValue;

      entity.liming = liming;
      entity.typeAnalysis = 'LIMING';
    }

    if (typeAnalysis instanceof AnalysisNpk) {
      const npk = new AnalysisNpkEntity();
      npk.analysisNpkId = typeAnalysis.getAnalysisNpkId().id;
      npk.analysis = entity;
      npk.phosphor = typeAnalysis.getPhosphor().getValue;
      npk.potassium = typeAnalysis.getPotassium().getValue;
      npk.expectedProductivity =
        typeAnalysis.getExpectedProductivity().getValue;
      npk.nitrogen = typeAnalysis.getNitrogen().getValue;

      entity.npk = npk;
      entity.typeAnalysis = 'NPK';
    }

    return entity;
  }

  static toDomain(entity: AnalysisEntity | AnalysisEntity[]): Analysis {
    let typeAnalysis: AnalysisLiming | AnalysisNpk | undefined;

    if (!Array.isArray(entity)) {
      if (entity.typeAnalysis === 'LIMING' && entity.typeAnalysis) {
        typeAnalysis = new AnalysisLiming({
          analysisLimingId: new AnalysisLimingId(
            entity.liming.analysisLimingId,
          ),
          analysisId: new AnalysisId(entity.analysisId),
          desiredBaseSaturation: new DesiredBaseSaturation(
            entity.liming.desiredBaseSaturation,
          ),
          currentBaseSaturation: new CurrentBaseSaturation(
            entity.liming.currentBaseSaturation,
          ),
          totalCationExchangeCapacity: new TotalCationExchangeCapacity(
            entity.liming.totalCationExchangeCapacity,
          ),
          relativeTotalNeutralizingPower: new RelativeTotalNeutralizingPower(
            entity.liming.relativeTotalNeutralizingPower,
          ),
          liming: new Liming(entity.liming.liming),
        });
      }

      if (entity.typeAnalysis === 'NPK' && entity.npk) {
        typeAnalysis = new AnalysisNpk({
          analysisNpkId: new AnalysisNpkId(entity.npk.analysisNpkId),
          analysisId: new AnalysisId(entity.analysisId),
          phosphor: new Phosphor(entity.npk.phosphor),
          potassium: new Potassium(entity.npk.potassium),
          expectedProductivity: new ExpectedProductivity(
            entity.npk.expectedProductivity,
          ),
          nitrogen: new Nitrogen(entity.npk.nitrogen),
        });
      }

      const analysis = new Analysis({
        analysisId: new AnalysisId(entity.analysisId),
        fieldId: new FieldId(entity.fieldId),
        isActive: entity.isActive,
        typeAnalysis,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      });

      analysis.validate();

      if (analysis.notification.hasErrors()) {
        throw new Error(analysis.notification.toJSON());
      }

      return analysis;
    } else if (Array.isArray(entity)) {
    }
  }
}
