import { FieldId } from 'src/core/field/domain/Field';
import { AnalysisValidatorFactory } from './AnalysisValidator';
import { Uuid } from 'src/core/shared/domain/value-objects/UuidVo';
import { Entity } from 'src/core/shared/domain/Entity';
import { AnalysisLiming } from './AnalysisLiming';
import { AnalysisNpk } from './AnalysisNpk';

export type AnalysisCreateProps = {
  fieldId: FieldId;
  isActive: boolean;
  typeAnalysis: AnalysisLiming | AnalysisNpk;
};

export type AnalysisConstructorProps = {
  analysisId?: AnalysisId;
  fieldId?: FieldId;
  typeAnalysis: AnalysisLiming | AnalysisNpk;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};


export class AnalysisId extends Uuid {}

export class Analysis extends Entity {
  private analysisId: AnalysisId;
  private fieldId: FieldId;
  private typeAnalysis: AnalysisLiming | AnalysisNpk;
  private isActive: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: AnalysisConstructorProps) {
    super();
    this.analysisId = props.analysisId ? props.analysisId : new AnalysisId();
    this.fieldId = props.fieldId ?? null;
    this.isActive = props.isActive;
    this.typeAnalysis = props.typeAnalysis;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static create(props: AnalysisCreateProps) {
    const analysis = new Analysis(props);

    analysis.validate();

    return analysis;
  }

  public validate(fields?: string[]) {
    const analysisValidator = AnalysisValidatorFactory.create();

    return analysisValidator.validate(this.notification, this, fields);
  }

  public calculate() {
    if(this.typeAnalysis instanceof AnalysisLiming) {
      this.typeAnalysis.notification.copyErrors(this.notification)
      this.typeAnalysis.calculateLiming()
    }

    if(this.typeAnalysis instanceof AnalysisNpk) {
      this.typeAnalysis.notification.copyErrors(this.notification)
      this.typeAnalysis.calculateNpk()
    }
  }

  
  get getId(): AnalysisId {
    return this.analysisId;
  }

  toJSON() {
    return {
      analysisId: this.analysisId.id,
      fieldId: this.fieldId.id,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
