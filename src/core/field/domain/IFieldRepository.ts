import { IRepository } from 'src/core/shared/domain/repository/IRepository';
import { Field, FieldId } from './Field';

export interface IFieldRepository extends IRepository<Field, FieldId> {}
