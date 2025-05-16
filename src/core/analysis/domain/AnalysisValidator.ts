import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Analysis } from "./Analysis";
import { ClassValidatorRules } from "src/core/shared/domain/validators/ClassValidatorRules";
import { Notification } from "src/core/shared/domain/validators/Notification";
import { FieldId } from "src/core/field/domain/Field";

export class AnalysisRules {
    @IsNotEmpty({ groups: ['analysisId'] })
    analysisId: string

    @IsNotEmpty({ groups: ['fieldId'] })
    fieldId: FieldId

  
    @IsNotEmpty()
    @IsBoolean({groups: ['isActive']})
    isActive: boolean

    constructor(entity: Analysis) {
        this.analysisId = entity['analysisId'].toString()
        
        this.fieldId = entity['fieldId']
       
        this.isActive = entity['isActive']
    }
}

export class AnalysisValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {

        const newFields = fields ? fields : ['analysisId', 'fieldId', 'isActive']

        return super.validate(notification, new AnalysisRules(data), newFields)
    }
}


export class AnalysisValidatorFactory {
    static create() {
        return new AnalysisValidator()
    }
}
