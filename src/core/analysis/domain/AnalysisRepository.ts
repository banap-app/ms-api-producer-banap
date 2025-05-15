import { IRepository } from "src/core/shared/domain/repository/IRepository";
import { Analysis, AnalysisId } from "./Analysis";

export interface AnalysisRepository extends IRepository<Analysis, AnalysisId> {}