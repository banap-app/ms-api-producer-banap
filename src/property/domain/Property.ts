import { Password } from "../../producer/domain/PasswordVo";
import { ProducerId } from "../../producer/domain/Producer";
import { Entity } from "../../shared/domain/Entity";
import { Uuid } from "../../shared/domain/value-objects/UuidVo";
import { PropertyValidatorFactory } from "./PropertyValidator";

export type PropertyConstructorProps = {
  propertyId?: string;
  producerId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type PropertyCreateCommand = {
  producerId: string;
  name: string;
};

export class PropertyId extends Uuid {}

export class Property extends Entity {
  private propertyId: PropertyId;
  private producerId: ProducerId;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: PropertyConstructorProps) {
    super();
    this.propertyId = props.propertyId
      ? new PropertyId(props.propertyId)
      : new PropertyId();
    this.producerId = new ProducerId(props.producerId);
    this.name = props.name;
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: PropertyCreateCommand) {
    const property = new Property(props);
    property.validate([]);
    return property;
  }

  private validate(fields: string[]) {
    const propertyValidate = PropertyValidatorFactory.create();
    return propertyValidate.validate(this.notification, this, fields);
  }

  get getId() {
    return this.propertyId;
  }

  public changeName(name: string) {
    this.name = name;
    this.validate(["name"]);
  }

  toJSON() {
    return {
      propertyId: this.propertyId,
      producerId: this.producerId,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
