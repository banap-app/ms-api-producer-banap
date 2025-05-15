import { Analysis } from "../../domain/Analysis";
import {ExpectedProductivity, Liming, Nitrogen, Phosphor, Potassium, RelativeTotalNeutralizingPower, TotalCationExchangeCapacity, } from '../../domain/indexVo'

export class AnalysisOutputMapper {
    static toOutput(entity: Analysis) {
        const { analysisId,fieldId, ...props } = entity.toJSON()
        return {
            analysisId: analysisId.id,
            fieldId: fieldId.id,
            ...props
        }
    }
}


export type AnalysisOutput = {
    id: string
    fieldId: string
    desiredBaseSaturation: number
    currentBaseSaturation: number
   totalCationExchangeCapacity: TotalCationExchangeCapacity
    relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower
    liming: Liming
    phosphor: Phosphor
    potassium: Potassium
    expectedProductivity: ExpectedProductivity
    nitrogen: Nitrogen
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}