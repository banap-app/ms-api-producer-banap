import { MacroNutrientError } from '../errors/MacroNutrientError';
import { ValueObject } from '../../../shared/domain/ValueObject';

export class ExpectedProductivity extends ValueObject {
  constructor(private readonly expectedProductivity: number) {
    super();
    this.validate();
  }

  private validate() {
    if (this.expectedProductivity < 0 || this.expectedProductivity == 0) {
      throw new MacroNutrientError('Invalid Expected Productivity');
    }
    if (this.expectedProductivity > 1000) {
      throw new MacroNutrientError('Invalid Expected Productivity');
    }
  }

  public get getValue(): number {
    return this.expectedProductivity;
  }
}
