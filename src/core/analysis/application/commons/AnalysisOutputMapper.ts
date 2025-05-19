import { Analysis } from "../../domain/Analysis";
import { AnalysisLiming } from "../../domain/AnalysisLiming";
import { AnalysisNpk } from "../../domain/AnalysisNpk";

export class AnalysisOutputMapper {
    static toOutput(entity: Analysis) {
        const { analysisId,fieldId, ...props } = entity.toJSON()
        return {
            id: analysisId,
            fieldId: fieldId,
            ...props
        }
    }
}


export type AnalysisOutput = {
    id: string
    fieldId: string
    typeAnalysis: AnalysisLiming | AnalysisNpk
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}