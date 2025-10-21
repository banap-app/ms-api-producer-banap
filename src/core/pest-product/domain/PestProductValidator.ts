import { ClassValidatorRules } from "src/core/shared/domain/validators/ClassValidatorRules";
import { Notification } from "src/core/shared/domain/validators/Notification";
import { Culture, PestProduct } from "./PestProduct";
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PestProductRules {
    constructor(entity: PestProduct) {
        Object.assign(this, entity)
    }
    @MaxLength(255, {
        groups: ['name'],
      })
      @IsEnum(Culture)
      @IsNotEmpty()
      culture: Culture;
}

export class PestProductValidatorFactory {
  static create(){
    return new PestProductValidator()
  }
}

export class PestProductValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields ? fields : ['culture'];
    return super.validate(notification, new PestProductRules(data), newFields);
  }
}
