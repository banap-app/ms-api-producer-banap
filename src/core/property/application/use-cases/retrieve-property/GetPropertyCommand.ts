export type GetPropertyCommandProps = {
  propertyId: string;
};

export class GetPropertyCommand {
  public propertyId: string;

  constructor(props: GetPropertyCommandProps) {
    if (!props) return;
    this.propertyId = props.propertyId;
  }
}
