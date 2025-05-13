import { ProducerId } from '../../producer/domain/Producer';
import { Entity } from '../../shared/domain/Entity';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { PropertyValidatorFactory } from './PropertyValidator';

export type PropertyConstructorProps = {
  propertyId?: string;
  producerId: string;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type PropertyCreateCommand = {
  producerId: string;
  name: string;
  isActive: boolean;
};

export class PropertyId extends Uuid {}

export class Property extends Entity {
  private propertyId: PropertyId;
  private producerId: ProducerId;
  private name: string;
  private isActive: boolean;
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

  public changeName(name: string) {
    this.name = name;
    this.validate(['name']);
  }

  public activate() {
    this.isActive = true;
    this.deletedAt = null;
  }

  public deactivate() {
    this.isActive = false;
    this.deletedAt = new Date();
  }

  get getId() {
    return this.propertyId;
  }

  toJSON() {
    return {
      propertyId: this.propertyId.id,
      producerId: this.producerId,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
