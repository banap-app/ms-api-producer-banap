import { ValueObject } from "./ValueObject";

export abstract class Entity {
  abstract get getId(): ValueObject;
  abstract toJSON(): any;
}
