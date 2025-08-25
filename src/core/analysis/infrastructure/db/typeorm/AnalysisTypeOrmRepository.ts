import { Repository, In } from 'typeorm';
import { Analysis } from '../../../domain/Analysis';
import { AnalysisRepository } from '../../../domain/AnalysisRepository';
import { AnalysisEntity } from './AnalysisEntity';
import { AnalysisEntityMapper } from './AnalysisEntityMapper';
import { AnalysisId } from '../../../domain/AnalysisId';
import { FieldId } from 'src/core/field/domain/Field';

export class AnalysisTypeOrmRepository implements AnalysisRepository {
  private ormRepository: Repository<AnalysisEntity>;

  constructor(ormRepository: Repository<AnalysisEntity>) {
    this.ormRepository = ormRepository;
  }

  async insert(entity: Analysis): Promise<void> {
    const analysis = AnalysisEntityMapper.toTypeEntity(entity);
    await this.ormRepository.save(analysis);
  }

  async bulkInsert(entities: Analysis[]): Promise<void> {
    const analyses = entities.map(AnalysisEntityMapper.toTypeEntity);
    await this.ormRepository.save(analyses);
  }

  async update(entity: Analysis): Promise<void> {
    const analysis = AnalysisEntityMapper.toTypeEntity(entity);
    await this.ormRepository.update(
      { analysisId: analysis.analysisId },
      analysis,
    );
  }

  async bulkUpdate(entities: Analysis[]): Promise<void> {
    const analyses = entities.map(AnalysisEntityMapper.toTypeEntity);
    await this.ormRepository.save(analyses);
  }

  async delete(entity_id: AnalysisId): Promise<void> {
    await this.ormRepository.delete({ analysisId: entity_id.id });
  }

  async bulkDelete(entities_ids: AnalysisId[]): Promise<void> {
    const ids = entities_ids.map((id) => id.id);
    await this.ormRepository.delete({ analysisId: In(ids) });
  }

  async findAll(): Promise<Analysis[]> {
    throw new Error('Not implemented');
  }

  async findAllByFieldId(fieldId: FieldId): Promise<Analysis[]> {
    const entities = await this.ormRepository.find({
      where: { fieldId: fieldId.id },
      relations: ['npk', 'liming'],
    });
    console.log(entities);
    return entities
      ? entities.map((e) => AnalysisEntityMapper.toDomain(e))
      : null;
  }

  async findById(entity_id: AnalysisId): Promise<Analysis> {
    const entity = await this.ormRepository.findOne({
      where: { analysisId: entity_id.id },
      relations: ['liming', 'npk'],
    });

    console.log(entity);
    return entity ? AnalysisEntityMapper.toDomain(entity) : null;
  }
}
