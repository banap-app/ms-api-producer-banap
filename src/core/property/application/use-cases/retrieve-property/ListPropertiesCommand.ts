export type ListPropertiesCommandProps = {
  producerId: string;
};

export class ListPropertiesCommand {
  public producerId: string;

  constructor(props: ListPropertiesCommandProps) {
    if (!props) return;
    this.producerId = props.producerId;
  }
}
