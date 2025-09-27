export type CreatePropertyCommandProps = {
  producerId: string;
  engineerId?: string;
  name: string;
  isActive: boolean;
};

export class CreatePropertyCommand {
  public producerId: string;
  public engineerId?: string;
  public name: string;
  public isActive: boolean;

  constructor(props: CreatePropertyCommandProps) {
    if (!props) return;
    this.producerId = props.producerId;
    this.name = props.name;
    this.isActive = props.isActive;
    this.engineerId = props.engineerId;
  }
}
