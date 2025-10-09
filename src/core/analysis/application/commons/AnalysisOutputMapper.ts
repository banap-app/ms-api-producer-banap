import { Analysis } from '../../domain/Analysis';
import { AnalysisLiming } from '../../domain/AnalysisLiming';
import { AnalysisNpk } from '../../domain/AnalysisNpk';

export type AnalysisOutput = {
  id: string;
  fieldId: string;
  typeAnalysis:
    | {
        analysisLimingId: string;
        analysisId: string;
        desiredBaseSaturation: number;
        currentBaseSaturation: number;
        totalCationExchangeCapacity: number;
        relativeTotalNeutralizingPower: number;
        liming: number;
      }
    | {
        analysisNpkId: string;
        phosphor: number;
        potassium: number;
        nitrogen: number;
        expectedProductivity: number;
      };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class AnalysisOutputMapper {
  static toOutput(entity: Analysis): AnalysisOutput {
    const type = entity.getTypeAnalysis();

    const base = {
      id: entity.getId.id,
      fieldId: entity.getFieldId().id,
      isActive: entity.getIsActive(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
      deletedAt: entity.getDeletedAt(),
    };

    if (type instanceof AnalysisLiming) {
      return {
        ...base,
        typeAnalysis: {
          analysisLimingId: type.getId.id,
          analysisId: entity.getId.id,
          desiredBaseSaturation: type.getDesiredBaseSaturation().getValue,
          currentBaseSaturation: type.getCurrentBaseSaturation().getValue,
          totalCationExchangeCapacity:
            type.getTotalCationExchangeCapacity().getValue,
          relativeTotalNeutralizingPower:
            type.getRelativeTotalNeutralizingPower().getValue,
          liming: type.getLiming().getValue,
        },
      };
    }

    if (type instanceof AnalysisNpk) {
      return {
        ...base,
        typeAnalysis: {
          analysisNpkId: type.getAnalysisNpkId().id,
          phosphor: type.getPhosphor().getValue,
          potassium: type.getPotassium().getValue,
          nitrogen: type.getNitrogen().getValue,
          expectedProductivity: type.getExpectedProductivity().getValue,
        },
      };
    }

    throw new Error('typeAnalysis inválido em Analysis');
  }
}
