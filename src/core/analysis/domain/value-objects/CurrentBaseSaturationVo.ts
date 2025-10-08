import { ValueObject } from '../../../shared/domain/ValueObject';
import { MacroNutrientError } from '../errors/MacroNutrientError';

export class CurrentBaseSaturation extends ValueObject {
  constructor(private readonly currentBaseSaturation: number) {
    super();
    this.validate();
  }

  private validate() {
    if (this.currentBaseSaturation < 0 || this.currentBaseSaturation == 0) {
      throw new MacroNutrientError('Invalid Current Base Saturation');
    }
    if (this.currentBaseSaturation > 1000) {
      throw new MacroNutrientError('Invalid Desired Base Saturation');
    }
  }

  public toJSON() {
    return {
      currentBaseSaturation: this.currentBaseSaturation,
    };
  }

  public get getValue(): number {
    return this.currentBaseSaturation;
  }
}
