import { ValueObject } from "../../../shared/domain/ValueObject";
import { MacroNutrientError } from "../errors/MacroNutrientError";

export class RelativeTotalNeutralizingPower extends ValueObject{
    constructor(private readonly relativeTotalNeutralizingPower: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.relativeTotalNeutralizingPower < 0 || this.relativeTotalNeutralizingPower == 0) {
            throw new MacroNutrientError("Invalid Relative Total Neutralizing Power")
        }
        if (this.relativeTotalNeutralizingPower > 1000) {
            throw new MacroNutrientError("Invalid Relative Total Neutralizing Power")
        }
    }

    public get getValue(): number {
        return this.relativeTotalNeutralizingPower
    }
}