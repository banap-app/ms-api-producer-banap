import { IRepository } from 'src/core/shared/domain/repository/IRepository';
import { Field, FieldId } from './Field';
import { PropertyId } from 'src/core/property/domain/Property';

export interface IFieldRepository extends IRepository<Field, FieldId> {
  findAllByPropertyId(propertyId: PropertyId): Promise<Field[]>;
}
