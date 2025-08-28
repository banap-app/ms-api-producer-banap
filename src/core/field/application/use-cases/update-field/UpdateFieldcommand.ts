import { Coordinate } from 'src/core/field/domain/FieldBoundaryVo';

export type UpdateFieldCommandProps = {
  fieldId: string;
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: Coordinate[];
};

export class UpdateFieldCommand {
  public fieldId: string;
  public propertyId: string;
  public producerId: string;
  public name: string;
  public description: string;
  public crop: string;
  public fieldBoundary: Coordinate[];
  constructor(props: UpdateFieldCommandProps) {
    if (!props) return;
    this.fieldId = props.fieldId;
    this.propertyId = props.propertyId;
    this.producerId = props.producerId;
    this.name = props.name;
    this.description = props.description;
    this.crop = props.crop;
    this.fieldBoundary = props.fieldBoundary;
  }
}
