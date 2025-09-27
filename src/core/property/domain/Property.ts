import { EngineerId } from 'src/core/others/domain/SimpleEngineer';
import { ProducerId } from '../../producer/domain/Producer';
import { Entity } from '../../shared/domain/Entity';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { PropertyValidatorFactory } from './PropertyValidator';

export type PropertyConstructorProps = {
  propertyId?: string;
  producerId: string;
  engineerId?: string;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type PropertyCreateCommand = {
  producerId: string;
  engineerId?: string;
  name: string;
  isActive: boolean;
};

export class PropertyId extends Uuid {}

export class Property extends Entity {
  private propertyId: PropertyId;
  private producerId: ProducerId;
  private engineerId?: EngineerId | null;
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
    this.engineerId = props.engineerId
      ? new EngineerId(props.engineerId)
      : null;
    this.name = props.name;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: PropertyCreateCommand) {
    const property = new Property(props);
    property.validate([]);
    return property;
  }

  public validate(fields: string[]) {
    const propertyValidate = PropertyValidatorFactory.create();
    return propertyValidate.validate(this.notification, this, fields);
  }

  public aggregateEngineer(engineerId: EngineerId) {
    this.engineerId = engineerId;
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

  public getProducerId() {
    return this.producerId;
  }

  public getEngineerId() {
    return this.engineerId;
  }

  public getName() {
    return this.name;
  }

  public getIsActive() {
    return this.isActive;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }

  public getDeletedAt() {
    return this.deletedAt;
  }

  get getId() {
    return this.propertyId;
  }

  toJSON() {
    return {
      propertyId: this.propertyId.id,
      producerId: this.producerId.id,
      engineerId: this.engineerId ? this.engineerId.id : null,
      name: this.name,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
