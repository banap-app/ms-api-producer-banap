import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorRules } from '../../shared/domain/validators/ClassValidatorRules';
import { Field } from './Field';
import { Notification } from '../../shared/domain/validators/Notification';

export class FieldRules {
  constructor(entity: Field) {
    Object.assign(this, entity);
  }

  @IsNotEmpty({
    groups: ['propertyId'],
  })
  propertyId: string;

  @IsNotEmpty({
    groups: ['producerId'],
  })
  producerId: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty({
    groups: ['name'],
  })
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty({
    groups: ['description'],
  })
  description: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty({
    groups: ['crop'],
  })
  crop: string;
}

export class FieldValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields
      ? fields
      : ['propertyId', 'name', 'description', 'crop'];
    return super.validate(notification, new FieldRules(data), newFields);
  }
}

export class FieldValidatorFactory {
  static create() {
    return new FieldValidator();
  }
}
