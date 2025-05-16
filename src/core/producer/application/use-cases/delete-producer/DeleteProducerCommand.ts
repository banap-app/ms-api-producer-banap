export class DeleteProducerCommand {
  public producerId: string;

  constructor(producerId: string) {
    if (!producerId) return;
    this.producerId = producerId;
  }
}
