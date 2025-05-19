type TypeAnalysisInput =
  | {
      // Liming Analysis Props
      desiredBaseSaturation: number;
      currentBaseSaturation: number;
      totalCationExchangeCapacity: number;
      relativeTotalNeutralizingPower: number;
    }
  | {
      // NPK Analysis Props
      expectedProductivity?: number;
      phosphor?: number;
      potassium?: number;
    };

type CreateAnalysisCommandProps = {
  fieldId: string;
  isActive: boolean;
  typeAnalysis: TypeAnalysisInput;
};

export class CreateAnalysisCommand {
  public fieldId: string;
  public isActive: boolean;
  public typeAnalysis: TypeAnalysisInput;

  constructor(props: CreateAnalysisCommandProps) {
    if (!props) return;
    Object.assign(this, props);
  }
}
