import { Repository } from 'typeorm';
import { PropertyEntity } from './PropertyEntity';
import { Property, PropertyId } from 'src/core/property/domain/Property';
import { PropertyEntityTypeMapper } from './PropertyEntityTypeMapper';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';

export class PropertyTypeOrmRepository implements IPropertyRepository {
  private ormRepository: Repository<PropertyEntity>;

  constructor(ormRepository: Repository<PropertyEntity>) {
    this.ormRepository = ormRepository;
  }

  async insert(entity: Property): Promise<void> {
    const property = PropertyEntityTypeMapper.toTypeEntity(entity);
    await this.ormRepository.save(property);
  }

  bulkInsert(entities: Property[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Property): Promise<void> {
    throw new Error('Method not implemented.');
  }

  bulkUpdate(entities: Property[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity_id: PropertyId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  bulkDelete(entities_ids: PropertyId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Property[]> {
    throw new Error('Method not implemented.');
  }

  findById(entity_id: PropertyId): Promise<Property> {
    throw new Error('Method not implemented.');
  }
}
