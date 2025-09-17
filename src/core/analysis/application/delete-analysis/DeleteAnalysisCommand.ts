export type DeleteAnalysisProps = {
  analysisId: string;
};
export class DeleteAnalysisCommand {
  public analysisId: string;

  constructor(props: DeleteAnalysisProps) {
    if (!props) return;
    this.analysisId = props.analysisId;
  }
}
