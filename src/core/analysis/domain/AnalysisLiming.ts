import { Entity } from '../../shared/domain/Entity';
import {
  CurrentBaseSaturation,
  DesiredBaseSaturation,
  Liming,
  RelativeTotalNeutralizingPower,
  TotalCationExchangeCapacity,
} from './value-objects/indexVo';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { AnalysisLimingValidatorFactory } from './AnalysisLimingValidator';
import { AnalysisId } from './AnalysisId';

export type AnalysisLimingConstructorProps = {
  analysisLimingId?: AnalysisLimingId;
  analysisId?: AnalysisId;
  desiredBaseSaturation?: DesiredBaseSaturation;
  currentBaseSaturation?: CurrentBaseSaturation;
  liming?: Liming;
  totalCationExchangeCapacity?: TotalCationExchangeCapacity;
  relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower;
};

export type AnalysisLimingCreateProps = {
  analysisId?: AnalysisId;
  desiredBaseSaturation?: DesiredBaseSaturation;
  currentBaseSaturation: CurrentBaseSaturation;
  totalCationExchangeCapacity: TotalCationExchangeCapacity;
  relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower;
};

export class AnalysisLimingId extends Uuid {}
export class AnalysisLiming extends Entity {
  private analysisLimingId: AnalysisLimingId;
  private analysisId?: AnalysisId;
  private desiredBaseSaturation: DesiredBaseSaturation;
  private currentBaseSaturation: CurrentBaseSaturation;
  private totalCationExchangeCapacity: TotalCationExchangeCapacity;
  private relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower;
  private liming: Liming;

  constructor(props: AnalysisLimingConstructorProps) {
    super();
    this.analysisLimingId = props.analysisLimingId
      ? props.analysisLimingId
      : new AnalysisLimingId();
    this.analysisId = props.analysisId ? props.analysisId : new AnalysisId();
    this.currentBaseSaturation = props.currentBaseSaturation;
    this.desiredBaseSaturation = props.desiredBaseSaturation
      ? props.desiredBaseSaturation
      : new DesiredBaseSaturation(70);
    this.totalCationExchangeCapacity = props.totalCationExchangeCapacity;
    this.relativeTotalNeutralizingPower = props.relativeTotalNeutralizingPower;
    this.liming = props.liming;
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

  public defineAnalysisParent(analysisId: AnalysisId): AnalysisLiming {
    this.analysisId = analysisId;
    this.validate(['analysisId']);
    return this;
  }

  public calculateLiming() {
    this.liming = new Liming(23);
    return 3;
  }

  get getId(): AnalysisLimingId {
    return this.analysisLimingId;
  }
  public getAnalysisLimingId(): AnalysisLimingId {
    return this.analysisLimingId;
  }

  public getAnalysisId(): AnalysisId | undefined {
    return this.analysisId;
  }

  public getDesiredBaseSaturation(): DesiredBaseSaturation {
    return this.desiredBaseSaturation;
  }

  public getCurrentBaseSaturation(): CurrentBaseSaturation {
    return this.currentBaseSaturation;
  }

  public getTotalCationExchangeCapacity(): TotalCationExchangeCapacity {
    return this.totalCationExchangeCapacity;
  }

  public getRelativeTotalNeutralizingPower(): RelativeTotalNeutralizingPower {
    return this.relativeTotalNeutralizingPower;
  }

  public getLiming(): Liming {
    return this.liming;
  }

  public toJSON() {
    return {
      analysisLimingId: this.analysisLimingId.id,
      analysisId: this.analysisId?.id,
      desiredBaseSaturation: this.desiredBaseSaturation.getValue,
      currentBaseSaturation: this.currentBaseSaturation.getValue,
      totalCationExchangeCapacity: this.totalCationExchangeCapacity.getValue,
      relativeTotalNeutralizingPower:
        this.relativeTotalNeutralizingPower.getValue,
      liming: this.liming.getValue,
    };
  }
}
