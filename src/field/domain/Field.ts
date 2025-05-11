import { PropertyId } from "../../property/domain/Property";
import { Entity } from "../../shared/domain/Entity";
import { Uuid } from "../../shared/domain/value-objects/UuidVo";
import { Coordinate, FieldBoundary } from "./FieldBoundaryVo";
import { FieldValidatorFactory } from "./FieldValidator";

export type FieldConstructorProps = {
  fieldId?: string;
  propertyId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type FieldCreateCommand = {
  propertyId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
};

export class FieldId extends Uuid {}

export class Field extends Entity {
  private fieldId: FieldId;
  private propertyId: PropertyId;
  private name: string;
  private description: string;
  private crop: string;
  private fieldBoundary: FieldBoundary;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(props: FieldConstructorProps) {
    super();
    this.fieldId = props.fieldId ? new FieldId(props.fieldId) : new FieldId();
    this.propertyId = new PropertyId(props.propertyId);
    this.name = props.name;
    this.description = props.description;
    this.crop = props.crop;
    this.fieldBoundary = props.fieldBoundary
      ? new FieldBoundary(props.fieldBoundary)
      : new FieldBoundary();
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: FieldCreateCommand) {
    const field = new Field(props);
    field.validate([]);
    return field;
  }

  private validate(fields: string[]) {
    const fieldValidate = FieldValidatorFactory.create();
    return fieldValidate.validate(this.notification, this, fields);
  }

  public getArea() {
    return this.fieldBoundary.calculateFieldArea();
  }

  get getId() {
    return this.fieldId;
  }

  toJSON() {
    return {
      fieldId: this.fieldId,
      propertyId: this.propertyId,
      name: this.name,
      description: this.description,
      fieldBoundary: this.fieldBoundary,
      crop: this.crop,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
