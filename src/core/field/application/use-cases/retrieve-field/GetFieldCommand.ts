export type GetFieldCommandProps = {
  fieldId: string;
};

export class GetFieldCommand {
  public fieldId: string;

  constructor(props: GetFieldCommandProps) {
    if (!props) return;
    this.fieldId = props.fieldId;
  }
}
