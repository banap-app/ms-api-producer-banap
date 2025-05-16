import { MacroNutrientError } from "../errors/MacroNutrientError";
import { ValueObject } from "src/core/shared/domain/ValueObject";

export class Phosphor extends ValueObject{
    constructor(private readonly phosphor: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.phosphor < 0 || this.phosphor == 0) {
            throw new MacroNutrientError("Invalid Phosphor")
        }
        if (this.phosphor > 1000) {
            throw new MacroNutrientError("Invalid Phosphor")
        }
    }

    public get getValue(): number {
        return this.phosphor
    }
}