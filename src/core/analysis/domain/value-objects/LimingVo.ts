import { MacroNutrientError } from "../errors/MacroNutrientError";
import { ValueObject } from "src/core/shared/domain/ValueObject";

export class Liming extends ValueObject{
    constructor(private readonly liming: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.liming < 0 || this.liming == 0) {
            throw new MacroNutrientError("Invalid Liming")
        }
        if (this.liming > 1000) {
            throw new MacroNutrientError("Invalid Liming")
        }
    }

    public get getValue(): number {
        return this.liming
    }
}