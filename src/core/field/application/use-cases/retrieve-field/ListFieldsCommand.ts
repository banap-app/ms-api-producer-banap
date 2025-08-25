export type ListFieldsCommandProps = {
  propertyId: string;
};

export class ListFieldsCommand {
  public propertyId: string;

  constructor(props: ListFieldsCommandProps) {
    if (!props) return;
    this.propertyId = props.propertyId;
  }
}
