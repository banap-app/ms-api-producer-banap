import { ValueObject } from "src/core/shared/domain/ValueObject";
import { MacroNutrientError } from "./errors/MacroNutrientError";

export class DesiredBaseSaturation extends ValueObject{
    constructor(private readonly desiredBaseSaturation: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.desiredBaseSaturation < 0 || this.desiredBaseSaturation == 0) {
            throw new MacroNutrientError("Invalid Desired Base Saturation")
        }
        if (this.desiredBaseSaturation > 1000) {
            throw new MacroNutrientError("Invalid Desired Base Saturation")
        }
    }

    public get getValue(): number {
        return this.desiredBaseSaturation
    }
}