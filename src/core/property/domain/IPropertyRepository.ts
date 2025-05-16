import { ProducerId } from 'src/core/producer/domain/Producer';
import { IRepository } from '../../shared/domain/repository/IRepository';
import { Property, PropertyId } from './Property';

export interface IPropertyRepository extends IRepository<Property, PropertyId> {
  findByProducerId(producerId: ProducerId): Promise<Property[]>;
}
