import { Entity } from 'src/core/shared/domain/Entity';
import { ValueObject } from 'src/core/shared/domain/ValueObject';
import {
  CurrentBaseSaturation,
  DesiredBaseSaturation,
  ExpectedProductivity,
  Liming,
  RelativeTotalNeutralizingPower,
  TotalCationExchangeCapacity,
} from './value-objects/indexVo';
import { AnalysisId } from './Analysis';
import { Uuid } from 'src/core/shared/domain/value-objects/UuidVo';
import { AnalysisLimingValidatorFactory } from './AnalysisLimingValidator';

export type AnalysisLimingConstructorProps = {
  analysisLimingId?: AnalysisLimingId;
  analysisId: AnalysisId;
  desiredBaseSaturation?: DesiredBaseSaturation;
  currentBaseSaturation?: CurrentBaseSaturation;
  totalCationExchangeCapacity?: TotalCationExchangeCapacity;
  relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower;
};

export type AnalysisLimingCreateProps = {
  analysisId: AnalysisId;
  desiredBaseSaturation: DesiredBaseSaturation;
  currentBaseSaturation: CurrentBaseSaturation;
  totalCationExchangeCapacity: TotalCationExchangeCapacity;
  relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower;
};

export class AnalysisLimingId extends Uuid {}

export class AnalysisLiming extends Entity {
  private analysisLimingId: AnalysisLimingId;
  private analysisId: AnalysisId;
  private desiredBaseSaturation: DesiredBaseSaturation;
  private currentBaseSaturation: CurrentBaseSaturation;
  private totalCationExchangeCapacity: TotalCationExchangeCapacity;
  private relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower;
  private liming: Liming

  constructor(props: AnalysisLimingConstructorProps) {
    super();
    this.analysisLimingId = props.analysisLimingId
      ? props.analysisId
      : new AnalysisLimingId();
    this.analysisId = new AnalysisId(props.analysisId.id);
    this.currentBaseSaturation = props.currentBaseSaturation
    this.desiredBaseSaturation = props.desiredBaseSaturation
    this.totalCationExchangeCapacity = props.totalCationExchangeCapacity
    this.relativeTotalNeutralizingPower = props.relativeTotalNeutralizingPower
  }

  static create(props: AnalysisLimingCreateProps) {
    const analysisLiming = new AnalysisLiming(props);
    analysisLiming.validate();
    return analysisLiming;
  }

  public validate(fields?: string[]) {
    const analysisLimingValidator = AnalysisLimingValidatorFactory.create();
    return analysisLimingValidator.validate(this.notification, this, fields);
  }

  public calculateLiming() {
    return this
  }

  get getId(): AnalysisLimingId {
    return this.analysisLimingId
  }
  toJSON() {
    throw new Error('Method not implemented.');
  }
}
