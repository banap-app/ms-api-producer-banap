export type CreatePropertyCommandProps = {
  producerId: string;
  name: string;
  isActive: boolean;
};

export class CreatePropertyCommand {
  public producerId: string;
  public name: string;
  public isActive: boolean;

  constructor(props: CreatePropertyCommandProps) {
    if (!props) return;
    this.producerId = props.producerId;
    this.name = props.name;
    this.isActive = props.isActive;
  }
}
