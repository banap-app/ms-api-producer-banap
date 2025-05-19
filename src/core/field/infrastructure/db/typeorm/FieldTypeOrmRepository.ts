import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { Repository } from 'typeorm';
import { FieldEntity } from './FieldEntity';
import { Field, FieldId } from 'src/core/field/domain/Field';
import { FieldEntityMapper } from './FieldEntityMapper';

export class FieldTypeOrmRepository implements IFieldRepository {
  private readonly ormRepository: Repository<FieldEntity>;

  constructor(ormRepository: Repository<FieldEntity>) {
    this.ormRepository = ormRepository;
  }
  bulkUpdate(entities: Field[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  bulkDelete(entities_ids: FieldId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: Field): Promise<void> {
    const fieldEntity = FieldEntityMapper.toTypeEntity(entity);
    console.log(fieldEntity);
    await this.ormRepository.save(fieldEntity);
  }

  async update(entity: Field): Promise<void> {
    const existing = await this.ormRepository.findOne({
      where: { fieldId: entity.getId.id },
      relations: ['boundary', 'producer', 'property'],
    });
    if (!existing) {
      throw new Error(`Field not found: ${entity.getId.id}`);
    }

    // map primitives back onto the existing entity
    existing.name = entity.getName();
    existing.description = entity.getDescription();
    existing.crop = entity.getCrop();
    existing.isActive = entity.getIsActive();
    existing.updatedAt = entity.getUpdatedAt();
    existing.deletedAt = entity.getDeletedAt();

    // update boundary
    FieldEntityMapper.assignBoundary(
      existing,
      entity.getFieldBoundary().getPoints(),
    );

    // update relations (if needed)
    existing.producerId = entity.getProducerId().id;
    existing.propertyId = entity.getPropertyId().id;

    await this.ormRepository.save(existing);
  }

  async delete(entityId: FieldId): Promise<void> {
    await this.ormRepository.delete({ fieldId: entityId.toString() });
  }

  async findAll(): Promise<Field[]> {
    const entities = await this.ormRepository.find({
      relations: ['boundary', 'producer', 'property'],
    });
    return entities.map((e) => FieldEntityMapper.toDomain(e));
  }

  async findById(entityId: FieldId): Promise<Field> {

    const entity = await this.ormRepository.findOne({
      where: { fieldId: entityId.id },
      relations: ['boundary'],
    });
    if (!entity) {
      throw new Error(`Field not found: ${entityId.toString()}`);
    }
   
    return FieldEntityMapper.toDomain(entity);
  }

  // bulkInsert, bulkUpdate, bulkDelete, findAll unimplemented per request
  bulkInsert(entities: Field[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
