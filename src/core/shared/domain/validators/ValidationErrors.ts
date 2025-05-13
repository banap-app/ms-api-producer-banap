import { FieldErrors } from "./ValidatorRulesInterface";

export abstract class BaseValidationError extends Error {
    constructor(public errors:FieldErrors[], message = "Validation Error") {
        super(message)
    }

    count() {
        return Object.keys(this.errors).length
    }
}

export class EntityValidationError extends BaseValidationError {
  constructor(public errors: FieldErrors[]) {
    super(errors, 'Entity Validation Error');
    this.name = 'EntityValidationError';
  }

}