export type UpdatePropertyProps = {
  propertyId: string;
  propertyName: string;
};

export class UpdatePropertyCommand {
  public propertyId: string;
  public propertyName: string;

  constructor(props: UpdatePropertyProps) {
    if (!props) return;
    this.propertyId = props.propertyId;
    this.propertyName = props.propertyName;
  }
}
