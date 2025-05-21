import { Analysis } from "src/core/analysis/domain/Analysis"
import { AnalysisOutput } from "../../commons/AnalysisOutputMapper";

export type ListAnalysisOutputProps = {
    count: number
    analysis: Analysis[]
}

export type ListAnalysisOutput = {
    count: number
    analysis: AnalysisOutput[]
}