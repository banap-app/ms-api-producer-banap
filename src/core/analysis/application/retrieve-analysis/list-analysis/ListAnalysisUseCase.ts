import { UseCase } from "src/core/shared/application/IUseCase";
import { ListAnalysisCommand } from "./ListAnalysisCommand";
import { ListAnalysisOutput } from "./ListAnalysisOutput";
import { AnalysisRepository } from "src/core/analysis/domain/AnalysisRepository";
import { PropertyId } from "src/core/property/domain/Property";
import { FieldId } from "src/core/field/domain/Field";
import { AnalysisOutputMapper } from "../../commons/AnalysisOutputMapper";
import { IFieldRepository } from "src/core/field/domain/IFieldRepository";
import { EntityValidationError } from "src/core/shared/domain/validators/ValidationErrors";

export class ListAnalysisUseCase implements UseCase<ListAnalysisCommand, ListAnalysisOutput> {
    private analysisRepository: AnalysisRepository;
    private fieldRepository: IFieldRepository
    
    constructor(analysisRepository: AnalysisRepository, fieldRepository: IFieldRepository) {
        this.analysisRepository = analysisRepository
        this.fieldRepository = fieldRepository
    }

    async execute(aCommand: ListAnalysisCommand): Promise<ListAnalysisOutput> {
        const id = new FieldId(aCommand.fieldId)
        console.log(id)
        const field = await this.fieldRepository.findById(id)


        if (!field) {
            throw new Error('Not found a Field');
        }
        
        field.validate()

        if (field.notification.hasErrors()) {
            throw new EntityValidationError(field.notification.toJSON());
        }

        const analysis = await this.analysisRepository.findAllByFieldId(field.getId)

        if (!analysis) {
            throw new Error("Not exists analysis")
        }

        const analysisValidated = analysis.map((e) => {
            e.validate() 
            if(e.notification.hasErrors()) {
               throw new Error(e.notification.toJSON())
            }
         })

        return {
            count: analysis.length,
            analysis: analysis.map((e) => AnalysisOutputMapper.toOutput(e))
        }
    }

}