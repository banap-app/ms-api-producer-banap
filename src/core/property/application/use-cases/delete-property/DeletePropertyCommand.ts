export type DeletePropertyProps = {
  propertyId: string;
};
export class DeletePropertyCommand {
  public propertyId: string;
  constructor(deletePropertyProps: DeletePropertyProps) {
    if (!deletePropertyProps) return;
    this.propertyId = deletePropertyProps.propertyId;
  }
}
