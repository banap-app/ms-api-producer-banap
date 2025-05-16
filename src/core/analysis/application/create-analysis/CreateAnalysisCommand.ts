import { FieldId } from "src/core/field/domain/Field"
import { AnalysisNpk } from "../../domain/AnalysisNpk"
import { AnalysisLiming } from "../../domain/AnalysisLiming"

type CreateAnalysisCommandProps = {
    fieldId: FieldId
    isActive: boolean
    typeAnalysis:  AnalysisNpk | AnalysisLiming
}

export class CreateAnalysisCommand {
    public fieldId: FieldId
    public isActive: boolean
    public typeAnalysis:  AnalysisNpk | AnalysisLiming

    constructor(props: CreateAnalysisCommandProps) {
        if (!props) return
        Object.assign(this, props)
    }
}