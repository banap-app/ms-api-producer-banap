import { FieldId } from "src/core/field/domain/Field"
import { CurrentBaseSaturation, DesiredBaseSaturation, ExpectedProductivity, Liming, Nitrogen, Phosphor, Potassium, RelativeTotalNeutralizingPower, TotalCationExchangeCapacity } from '../../domain/indexVo'

type CreateAnalysisCommandProps = {
    fieldId?: FieldId
    desiredBaseSaturation?: DesiredBaseSaturation
    currentBaseSaturation?: CurrentBaseSaturation
    totalCationExchangeCapacity?: TotalCationExchangeCapacity
    relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower
    liming?: Liming
    phosphor?: Phosphor
    potassium?: Potassium
    expectedProductivity?: ExpectedProductivity
    nitrogen?: Nitrogen
    isActive: boolean
}

export class CreateAnalysisCommand {
    public fieldId?: FieldId
    public desiredBaseSaturation?: DesiredBaseSaturation
    public currentBaseSaturation?: CurrentBaseSaturation
    public totalCationExchangeCapacity?: TotalCationExchangeCapacity
    public relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower
    public liming?: Liming
    public phosphor?: Phosphor
    public potassium?: Potassium
    public expectedProductivity?: ExpectedProductivity
    public nitrogen?: Nitrogen
    public isActive: boolean
    public typeAnalysis: 'npk' | 'liming'

    constructor(props: CreateAnalysisCommandProps) {
        if (!props) return
        Object.assign(this, props)
    }
}