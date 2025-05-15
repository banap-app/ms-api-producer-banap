import { Analysis } from "../../domain/Analysis";
import {CurrentBaseSaturation, DesiredBaseSaturation, ExpectedProductivity, Liming, Nitrogen, Phosphor, Potassium, RelativeTotalNeutralizingPower, TotalCationExchangeCapacity, } from '../../domain/indexVo'

export class AnalysisOutputMapper {
    static toOutput(entity: Analysis) {
        const { analysisId,fieldId, ...props } = entity.toJSON()
        return {
            id: analysisId,
            fieldId: fieldId
            ...props
        }
    }
}


export type AnalysisOutput = {
    id: string
    fieldId: string
    desiredBaseSaturation: number
    currentBaseSaturation: number
   totalCationExchangeCapacity: number
    relativeTotalNeutralizingPower: number
    liming: number
    phosphor: number
    potassium: number
    expectedProductivity: number
    nitrogen: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}