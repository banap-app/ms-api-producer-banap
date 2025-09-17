import { ProducerId } from 'src/core/producer/domain/Producer';
import { PropertyId } from '../../property/domain/Property';
import { Entity } from '../../shared/domain/Entity';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { Coordinate, FieldBoundary } from './FieldBoundaryVo';
import { FieldValidatorFactory } from './FieldValidator';

export type FieldConstructorProps = {
  fieldId?: FieldId;
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type FieldCreateCommand = {
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
  isActive: boolean;
};

export class FieldId extends Uuid {}

export class Field extends Entity {
  private fieldId: FieldId;
  private propertyId: PropertyId;
  private producerId: ProducerId;
  private name: string;
  private description: string;
  private crop: string;
  private fieldBoundary: FieldBoundary;
  private isActive: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(props: FieldConstructorProps) {
    super();
    this.fieldId = props.fieldId ? props.fieldId : new FieldId();
    this.propertyId = new PropertyId(props.propertyId);
    this.producerId = new ProducerId(props.producerId);
    this.name = props.name;
    this.description = props.description;
    this.crop = props.crop;
    this.fieldBoundary = props.fieldBoundary
      ? new FieldBoundary(props.fieldBoundary)
      : new FieldBoundary();
    this.isActive = props.isActive;
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: FieldCreateCommand) {
    const field = new Field(props);
    field.validate([]);
    return field;
  }

  public validate(fields?: string[]) {
    const fieldValidate = FieldValidatorFactory.create();
    return fieldValidate.validate(this.notification, this, fields);
  }

  public changeName(name: string) {
    this.name = name;
    this.validate(['name']);
  }

  public changeDescription(description: string) {
    this.description = description;
    this.validate(['description']);
  }

  public changeCrop(crop: string) {
    this.crop = crop;
    this.validate(['crop']);
  }

  public activate() {
    this.isActive = true;
    this.deletedAt = null;
  }

  public deactivate() {
    this.isActive = false;
    this.deletedAt = new Date();
  }

  public changeFieldBoundary(fieldBoundary: Coordinate[]) {
    this.fieldBoundary = new FieldBoundary(fieldBoundary);
  }

  public getArea() {
    return this.fieldBoundary.calculateFieldArea();
  }

  public getPropertyId() {
    return this.propertyId;
  }

  public getProducerId() {
    return this.producerId;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getCrop() {
    return this.crop;
  }

  public getFieldBoundary() {
    return this.fieldBoundary;
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
    return this.fieldId;
  }

  toJSON() {
    return {
      fieldId: this.fieldId.id,
      propertyId: this.propertyId.id,
      producerId: this.producerId.id,
      name: this.name,
      description: this.description,
      fieldBoundary: this.fieldBoundary,
      crop: this.crop,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
