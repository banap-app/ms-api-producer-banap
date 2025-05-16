import { Entity } from '../../shared/domain/Entity';
import { ValueObject } from '../../shared/domain/ValueObject';
import {
  ExpectedProductivity,
  Nitrogen,
  Phosphor,
  Potassium,
} from './value-objects/indexVo';
import { AnalysisId } from './Analysis';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { AnalysisNpkValidatorFactory } from './AnalysisNpkValidator';

export type AnalysisConstructorProps = {
  analysisNpkId?: AnalysisNpkId;
  analysisId: AnalysisId;
  phosphor?: Phosphor;
  potassium?: Potassium;
  expectedProductivity?: ExpectedProductivity;
  nitrogen?: Nitrogen;
};

export type AnalysisNpkCreateProps = {
  analysisId: AnalysisId;
  phosphor?: Phosphor;
  potassium?: Potassium;
  expectedProductivity?: ExpectedProductivity;
};

export class AnalysisNpkId extends Uuid {}

export class AnalysisNpk extends Entity {
  private analysisNpkId: AnalysisNpkId;
  private analysisId: AnalysisId;
  private phosphor: Phosphor | null;
  private potassium: Potassium | null;
  private expectedProductivity: ExpectedProductivity | null;
  private nitrogen: Nitrogen | null;

  constructor(props: AnalysisConstructorProps) {
    super();
    this.analysisNpkId = props.analysisNpkId
      ? props.analysisId
      : new AnalysisNpkId();
    this.analysisId = new AnalysisId(props.analysisId.id);
    this.phosphor = props.phosphor;
    this.potassium = props.potassium;
    this.expectedProductivity = props.expectedProductivity;
    this.nitrogen = props.nitrogen;
  }

  static create(props: AnalysisNpkCreateProps) {
    const analysisNpk = new AnalysisNpk(props);
    analysisNpk.validate();
    return analysisNpk;
  }

  public defineAnalysisParent(analysisId: AnalysisId): AnalysisNpk {
    this.analysisId = analysisId
    this.validate(['analysisId'])
    return this
  }

  private validate(fields?: string[]) {
    const analysisNpkValidator = AnalysisNpkValidatorFactory.create();
    return analysisNpkValidator.validate(this.notification, this, fields);
  }

  public calculateNpk() {

    if(this.notification.hasErrors()) {
      return
    }

    const expectedProductivity = this.expectedProductivity.getValue;

    if (expectedProductivity > 50) {
      this.nitrogen = new Nitrogen(410);

      const potassium = this.potassium.getValue;

      const phosphor = this.phosphor.getValue;

      if (potassium) {
        this.potassium = new Potassium(800);
      }

      if (potassium >= 1.6 && potassium <= 3.0) {
        this.potassium = new Potassium(950);
      }

      if (potassium > 3.0) {
        this.potassium = new Potassium(750);
      }

      if (phosphor < 16) {
        this.phosphor = new Phosphor(240);
      }

      if (phosphor > 16 && phosphor <= 40) {
        this.phosphor = new Phosphor(150);
      }

      if (phosphor > 40) {
        this.phosphor = new Phosphor(120);
      }
    } else if (expectedProductivity >= 40 && expectedProductivity <= 50) {
      const potassium = this.potassium.getValue;

      const phosphor = this.phosphor.getValue;

      this.nitrogen = new Nitrogen(410);

      if (potassium < 1.6) {
        this.potassium = new Potassium(800);
      }

      if (potassium >= 1.6 && potassium <= 3.0) {
        this.potassium = new Potassium(750);
      }

      if (potassium > 3.0) {
        this.potassium = new Potassium(550);
      }

      if (phosphor < 16) {
        this.phosphor = new Phosphor(220);
      }

      if (phosphor > 16 && phosphor <= 40) {
        this.phosphor = new Phosphor(130);
      }

      if (phosphor > 40) {
        this.phosphor = new Phosphor(110);
      }
    } else if (expectedProductivity >= 30 && expectedProductivity < 40) {
      const potassium = this.potassium.getValue;

      const phosphor = this.phosphor.getValue;

      this.nitrogen = new Nitrogen(260);

      if (potassium < 1.6) {
        this.potassium = new Potassium(800);
      }

      if (potassium >= 1.6 && potassium <= 3.0) {
        this.potassium = new Potassium(550);
      }

      if (potassium > 3.0) {
        this.potassium = new Potassium(350);
      }
      if (phosphor < 16) {
        this.potassium = new Potassium(200);
      }

      if (phosphor > 16 && phosphor <= 40) {
        this.phosphor = new Phosphor(110);
      }

      if (phosphor > 40) {
        this.phosphor = new Phosphor(80);
      }
    } else if (expectedProductivity >= 20 && expectedProductivity < 30) {
      this.nitrogen = new Nitrogen(190);

      const potassium = this.potassium.getValue;

      const phosphor = this.phosphor.getValue;

      if (potassium < 1.6) {
        this.potassium = new Potassium(600);
      }

      if (potassium >= 1.6 && potassium <= 3.0) {
        this.potassium = new Potassium(350);
      }

      if (potassium > 3.0) {
        this.potassium = new Potassium(150);
      }
      if (phosphor < 16) {
        this.phosphor = new Phosphor(180);
      }

      if (phosphor > 16 && phosphor <= 40) {
        this.phosphor = new Phosphor(90);
      }

      if (phosphor > 40) {
        this.phosphor = new Phosphor(60);
      }
    } else {
      const potassium = this.potassium.getValue;

      const phosphor = this.phosphor.getValue;

      this.nitrogen = new Nitrogen(110);

      if (potassium < 1.6) {
        this.potassium = new Potassium(400);
      }

      if (potassium >= 1.6 && potassium <= 3.0) {
        this.potassium = new Potassium(150);
      }

      if (potassium > 3.0) {
        this.potassium = new Potassium(100);
      }

      if (phosphor < 16) {
        this.phosphor = new Phosphor(160);
      }

      if (phosphor > 16 && phosphor <= 40) {
        this.phosphor = new Phosphor(70);
      }

      if (phosphor > 40) {
        this.phosphor = new Phosphor(40);
      }
    }
  }

  get getId(): ValueObject {
    throw new Error('Method not implemented.');
  }
  toJSON() {
    throw new Error('Method not implemented.');
  }
}
