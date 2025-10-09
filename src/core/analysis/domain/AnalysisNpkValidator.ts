import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { AnalysisId } from './AnalysisId';
import { ClassValidatorRules } from '../../shared/domain/validators/ClassValidatorRules';
import { Notification } from '../../shared/domain/validators/Notification';
import { AnalysisNpk } from './AnalysisNpk';
import {
  ExpectedProductivity,
  Nitrogen,
  Phosphor,
  Potassium,
} from './value-objects/indexVo';

export class AnalysisNpkRules {
  @IsNotEmpty({ groups: ['analysisId'] })
  analysisId: AnalysisId;

  @IsNotEmpty({ groups: ['phosphor'] })
  phosphor: Phosphor;

  @IsNotEmpty({ groups: ['potassium'] })
  @IsNotEmptyObject()
  potassium: Potassium;

  @IsNotEmpty({ groups: ['expectedProductivity'] })
  expectedProductivity: ExpectedProductivity;

  @IsNotEmpty({ groups: ['nitrogen'] })
  nitrogen: Nitrogen;

  constructor(entity: AnalysisNpk) {
    this.analysisId = entity['analysisId'];
    this.phosphor = entity['phosphor'];
    this.potassium = entity['potassium'];
    this.expectedProductivity = entity['expectedProductivity'];
    this.nitrogen = entity['nitrogen'];
  }
}

export class AnalysisNpkValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields
      ? fields
      : ['phosphor', 'potassium', 'expectedProductivity'];

    return super.validate(notification, new AnalysisNpkRules(data), newFields);
  }
}

export class AnalysisNpkValidatorFactory {
  static create() {
    return new AnalysisNpkValidator();
  }
}
