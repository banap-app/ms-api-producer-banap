import { MacroNutrientError } from '../errors/MacroNutrientError';
import { ValueObject } from '../../../shared/domain/ValueObject';

export class Potassium extends ValueObject {
  constructor(private readonly potassium: number) {
    super();
    this.validate();
  }

  private validate() {
    if (this.potassium < 0 || this.potassium == 0) {
      throw new MacroNutrientError('Invalid Potassium');
    }
    if (this.potassium > 1000) {
      throw new MacroNutrientError('Invalid Potassium');
    }
  }

  public get getValue(): number {
    return this.potassium;
  }
}
