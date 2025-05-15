export class MacroNutrientError extends Error {
    constructor(message?: string) {
        super(message ?? "Invalid MacroNutrient")
        this.name = "MacroNutrientError"
    }
}