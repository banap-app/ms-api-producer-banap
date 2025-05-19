import { Coordinate } from 'src/core/field/domain/FieldBoundaryVo';

export type CreateFieldCommandProps = {
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
  isActive: boolean;
};

export class CreateFieldCommand {
  public propertyId: string;
  public producerId: string;
  public name: string;
  public description: string;
  public crop: string;
  public fieldBoundary: Coordinate[];
  public isActive: boolean;

  constructor(props: CreateFieldCommandProps) {
    if (!props) return;
    this.propertyId = props.propertyId;
    this.producerId = props.producerId;
    this.name = props.name;
    this.description = props.description;
    this.crop = props.crop;
    this.fieldBoundary = props.fieldBoundary;
    this.isActive = props.isActive;
  }
}
