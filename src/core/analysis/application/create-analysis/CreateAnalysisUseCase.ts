import { UseCase } from "../../../shared/application/IUseCase";
import { CreateAnalysisCommand } from "./CreateAnalysisCommand";
import { AnalysisRepository } from "../../domain/AnalysisRepository";
import { Analysis } from "../../domain/Analysis";
import { EntityValidationError } from "../../../shared/domain/validators/ValidationErrors";
import { AnalysisOutput, AnalysisOutputMapper } from "../commons/AnalysisOutputMapper";
 
export class CreateAnalysisUseCase implements UseCase<CreateAnalysisCommand, CreateAnalysisOutput> {
    private analysisRepository: AnalysisRepository
    constructor(analysisRepository: AnalysisRepository) {
        this.analysisRepository = analysisRepository
    }
    async execute(aCommand: CreateAnalysisCommand): Promise<CreateAnalysisOutput> {
        const anAnalysis = Analysis.create(aCommand)
        const typeAnalysis = aCommand.typeAnalysis.defineAnalysisParent(anAnalysis.getId)
        anAnalysis.defineTypeOfAnalysis(typeAnalysis)

        if(anAnalysis.notification.hasErrors()){
            throw new EntityValidationError(anAnalysis.notification.toJSON())
        }

        const existsAnalysis = await this.analysisRepository.findById(anAnalysis.getId)

        if(existsAnalysis) {
            throw new Error("Exists an Analysis")
        }
        
        await anAnalysis.calculate()
      
        await this.analysisRepository.insert(anAnalysis)

        return AnalysisOutputMapper.toOutput(anAnalysis)

    }
   
}

export type CreateAnalysisOutput = AnalysisOutput