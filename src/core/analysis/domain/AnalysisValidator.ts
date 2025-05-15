import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Analysis, AnalysisId } from "./Analysis";
import { CurrentBaseSaturation } from "./CurrentBaseSaturationVo";
import { DesiredBaseSaturation } from "./DesiredBaseSaturationVo";
import { ExpectedProductivity } from "./ExpectedProductivityVo";
import { TotalCationExchangeCapacity } from "./TotalCationExchangeCapacityVo";
import { RelativeTotalNeutralizingPower } from "./RelativeTotalNeutralizingPowerVo";
import { Liming } from "./LimingVo";
import { Phosphor } from "./PhosporVo";
import { Potassium } from "./PotassiumVo";
import { Nitrogen } from "./NitrogenVo";
import { ClassValidatorRules } from "src/core/shared/domain/validators/ClassValidatorRules";
import { Notification } from "src/core/shared/domain/validators/Notification";
import { FieldId } from "src/core/field/domain/Field";

export class AnalysisRules {
    @IsNotEmpty({ groups: ['analysisId'] })
    analysisId: string

    @IsNotEmpty({ groups: ['fieldId'] })
    fieldId: FieldId

    @IsOptional({ groups: ['desiredBaseSaturation'] })
    @IsNumber()
    desiredBaseSaturation: DesiredBaseSaturation

    @IsOptional({groups: ['currentBaseSaturation']})
    currentBaseSaturation: CurrentBaseSaturation

    @IsOptional({groups: ['totalCationExchangeCapacity']})
    totalCationExchangeCapacity: TotalCationExchangeCapacity

    @IsOptional({groups: ['relativeTotalNeutralizingPower']})
    relativeTotalNeutralizingPower: RelativeTotalNeutralizingPower

    @IsOptional({groups: ['liming']})
    liming: Liming

    @IsOptional({groups: ['phosphor']})
    phosphor: Phosphor

    @IsOptional({groups: ['potassium']})
    potassium:Potassium

    @IsOptional({groups: ['expectedProductivity']})
    expectedProductivity: ExpectedProductivity

    @IsOptional({groups: ['nitrogen']})
    nitrogen: Nitrogen

    @IsNotEmpty()
    @IsBoolean({groups: ['isActive']})
    isActive: boolean

    constructor(entity: Analysis) {
        this.analysisId = entity['analysisId'].toString()
        this.desiredBaseSaturation = entity['desiredBaseSaturation']
        this.fieldId = entity['fieldId']
        this.currentBaseSaturation = entity['currentBaseSaturation']
        this.totalCationExchangeCapacity = entity['totalCationExchangeCapacity']
        this.relativeTotalNeutralizingPower = entity['relativeTotalNeutralizingPower']
        this.liming = entity['liming']
        this.phosphor = entity['phosphor']
        this.potassium = entity['potassium']
        this.expectedProductivity = entity['expectedProductivity']
        this.nitrogen = entity['nitrogen']
        this.isActive = entity['isActive']
    }
}

export class AnalysisValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {

        const newFields = fields ? fields : ['analysisId', 'fieldId', 'desiredBaseSaturation', 'currentBaseSaturation', 'totalCationExchangeCapacity', 'relativeTotalNeutralizingPower', 'liming', 'phosphor', 'potassium', 'expectedProductivity', 'nitrogen', 'isActive']

        return super.validate(notification, new AnalysisRules(data), newFields)
    }
}


export class AnalysisValidatorFactory {
    static create() {
        return new AnalysisValidator()
    }
}
