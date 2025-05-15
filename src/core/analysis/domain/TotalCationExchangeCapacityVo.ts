import { ValueObject } from "src/core/shared/domain/ValueObject";
import { MacroNutrientError } from "./errors/MacroNutrientError";

export class TotalCationExchangeCapacity extends ValueObject{
    constructor(private readonly totalCationExchangeCapacity: number) {
        super()
        this.validate()
    }

    private validate() {
        
        if(this.totalCationExchangeCapacity < 0 || this.totalCationExchangeCapacity == 0) {
            throw new MacroNutrientError("Invalid Total Cation Exchange Capacity")
        }
        if (this.totalCationExchangeCapacity > 1000) {
            throw new MacroNutrientError("Invalid Total Cation Exchange Capacity")
        }
    }

    public get getValue(): number {
        return this.totalCationExchangeCapacity
    }
}