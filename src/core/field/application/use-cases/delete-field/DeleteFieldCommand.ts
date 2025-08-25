export class DeleteFieldCommand {
  public fieldId: string;

  constructor(fieldId: string) {
    if (!fieldId) return;
    this.fieldId = fieldId;
  }
}
