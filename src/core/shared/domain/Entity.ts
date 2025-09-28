import { isEqual } from 'lodash';
import { Notification } from './validators/Notification';
import { ValueObject } from './ValueObject';

export abstract class Entity {
  notification: Notification = new Notification();
  abstract get getId(): ValueObject;
  abstract toJSON(): any;

  public equals(vo: this): boolean {
    if (vo === this) {
      return true;
    }
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(vo, this);
  }
}
