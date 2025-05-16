import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AnalysisId } from './Analysis';
import { ClassValidatorRules } from 'src/core/shared/domain/validators/ClassValidatorRules';
import { Notification } from 'src/core/shared/domain/validators/Notification';
import { AnalysisNpk } from './AnalysisNpk';

export class AnalysisNpkRules {

  @IsNotEmpty({ groups: ['analysisId'] })
  analysisId: AnalysisId;

  constructor(entity: AnalysisNpk) {
    this.analysisId = entity['analysisId'];
  }
}

export class AnalysisNpkValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields
      ? fields
      : [
          'analysisId'
        ];

    return super.validate(
      notification,
      new AnalysisNpkRules(data),
      newFields,
    );
  }
}

export class AnalysisNpkValidatorFactory {
  static create() {
    return new AnalysisNpkValidator();
  }
}
