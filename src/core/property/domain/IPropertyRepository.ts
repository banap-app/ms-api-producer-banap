import { IRepository } from '../../shared/domain/repository/IRepository';
import { Property, PropertyId } from './Property';

export interface IPropertyRepository
  extends IRepository<Property, PropertyId> {}
