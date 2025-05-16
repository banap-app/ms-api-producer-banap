import { MacroNutrientError } from "../errors/MacroNutrientError";
import { ValueObject } from "src/core/shared/domain/ValueObject";

export class Nitrogen extends ValueObject{
    
    constructor(private readonly nitrogen: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.nitrogen < 0 || this.nitrogen == 0) {
            throw new MacroNutrientError("Invalid Nitrogen")
        }
        if (this.nitrogen > 4000) {
            throw new MacroNutrientError("Invalid Nitrogen")
        }
    }

    public get getValue(): number {
        return this.nitrogen
    }
}