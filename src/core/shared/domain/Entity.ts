import { Notification } from './validators/Notification';
import { ValueObject } from './ValueObject';

export abstract class Entity {
  notification: Notification = new Notification();
  abstract get getId(): ValueObject;
  abstract toJSON(): any;
}
