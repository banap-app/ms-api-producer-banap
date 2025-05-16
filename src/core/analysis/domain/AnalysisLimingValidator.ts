import {  IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { AnalysisId } from "./Analysis";
import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Notification } from "../../shared/domain/validators/Notification";
import { AnalysisLiming } from "./AnalysisLiming";
import { CurrentBaseSaturation, DesiredBaseSaturation, RelativeTotalNeutralizingPower, TotalCationExchangeCapacity } from "./value-objects/indexVo";

export class AnalysisLimingRules {
    @IsNotEmpty({ groups: ['analysisLimingId'] })
    analysisLimingId: string

    @IsNotEmpty({ groups: ['analysisId'] })
    analysisId: AnalysisId
  
    @IsNotEmpty({groups: ['desiredBaseSaturation']})
    desiredBaseSaturation: DesiredBaseSaturation

    @IsNotEmpty({groups: ['currentBaseSaturation']})
    currentBaseSaturation: CurrentBaseSaturation

    @IsNotEmpty({groups: ['totalCationExchangeCapacity']})
    totalCationExchangeCapacity: TotalCationExchangeCapacity

    @IsNotEmpty({groups: ['relativeTotalNeutralizingPower']})
    relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower

    constructor(entity: AnalysisLiming) {
        this.analysisLimingId = entity['analysisLimingId'].id
        
        this.analysisId = entity['analysisId']
       
        this.desiredBaseSaturation = entity['desiredBaseSaturation']

        this.currentBaseSaturation = entity['currentBaseSaturation']

        this.totalCationExchangeCapacity = entity['totalCationExchangeCapacity']

        this.relativeTotalNeutralizingPower = entity['relativeTotalNeutralizingPower']
    }
}

export class AnalysisLimingValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {

        const newFields = fields ? fields : [ 'analysisLimingId', 'relativeTotalNeutralizingPower', 'totalCationExchangeCapacity', 'desiredBaseSaturation', 'currentBaseSaturation']

        return super.validate(notification, new AnalysisLimingRules(data), newFields)
    }
}


export class AnalysisLimingValidatorFactory {
    static create() {
        return new AnalysisLimingValidator()
    }
}
