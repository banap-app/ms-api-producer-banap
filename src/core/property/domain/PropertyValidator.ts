import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Property } from "./Property";
import { Notification } from "../../shared/domain/validators/Notification";

export class PropertyRules {
  constructor(entity: Property) {
    Object.assign(this, entity);
  }

  @IsNotEmpty({
    groups: ["producerId"],
  })
  producerId: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty({
    groups: ["name"],
  })
  name: string;
}

export class PropertyValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields ? fields : ["producerId", "name"];
    return super.validate(notification, new PropertyRules(data), newFields);
  }
}

export class PropertyValidatorFactory {
  static create() {
    return new PropertyValidator();
  }
}
