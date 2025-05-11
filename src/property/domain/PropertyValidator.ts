import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Property } from "./Property";
import { Notification } from "../../shared/domain/validators/Notification";

export class PropertyRules {
  constructor(entity: Property) {
    Object.assign(this, entity);
  }

  @MaxLength(255, {
    groups: ["name"],
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PropertyValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields ? fields : ["name"];
    return super.validate(notification, new PropertyRules(data), newFields);
  }
}

export class PropertyValidatorFactory {
  static create() {
    return new PropertyValidator();
  }
}
