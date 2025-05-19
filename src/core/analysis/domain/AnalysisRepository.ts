import { IRepository } from 'src/core/shared/domain/repository/IRepository';
import { Analysis } from './Analysis';
import { AnalysisId } from './AnalysisId';
import { FieldId } from 'src/core/field/domain/Field';

export interface AnalysisRepository extends IRepository<Analysis, AnalysisId> {
  findAllByFieldId(fieldId: FieldId): Promise<Analysis[]>;
}
