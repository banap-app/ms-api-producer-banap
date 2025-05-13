import { validateSync } from 'class-validator';
import { Notification } from './Notification';
import { IValidatorRules } from './ValidatorRulesInterface';

export abstract class ClassValidatorRules implements IValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const errors = validateSync(data, {
      groups: fields,
    });
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints!).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
    return !errors.length;
  }
}
