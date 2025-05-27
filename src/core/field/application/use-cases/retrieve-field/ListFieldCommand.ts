export type ListFieldCommandProps = {
  propertyId: string;
};

export class ListFieldCommand {
  public propertyId: string;

  constructor(props: ListFieldCommandProps) {
    this.propertyId = props.propertyId;
  }
}
