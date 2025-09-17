import { Repository, In } from 'typeorm';
import { Analysis } from '../../../domain/Analysis';
import { AnalysisRepository } from '../../../domain/AnalysisRepository';
import { AnalysisEntity } from './AnalysisEntity';
import { AnalysisEntityMapper } from './AnalysisEntityMapper';
import { AnalysisId } from '../../../domain/AnalysisId';
import { FieldId } from 'src/core/field/domain/Field';
import { AnalysisLimingEntity } from './AnalysisLimingEntity';
import { AnalysisNpkEntity } from './AnalysisNpkEntity';

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
    const mapped = AnalysisEntityMapper.toTypeEntity(entity);

    // se não usa @UpdateDateColumn
    mapped.updatedAt = new Date();

    // NÃO envie relações no update()
    const { liming, npk, ...onlyAnalysis } = mapped as any;

    await this.ormRepository.update(
      { analysisId: mapped.analysisId },
      onlyAnalysis, // só colunas diretas de Analysis
    );

    // Repositórios das relações usando o manager do próprio repo
    const limingRepo =
      this.ormRepository.manager.getRepository(AnalysisLimingEntity);
    const npkRepo = this.ormRepository.manager.getRepository(AnalysisNpkEntity);

    // --- LIMING ---
    if (liming !== undefined) {
      if (liming === null) {
        await limingRepo.delete({
          analysis: { analysisId: mapped.analysisId },
        });
      } else if (liming.analysisLimingId) {
        await limingRepo.update(liming.analysisLimingId, { ...liming });
      } else {
        await limingRepo.save(
          limingRepo.create({
            ...liming,
            analysis: { analysisId: mapped.analysisId },
          }),
        );
      }
    }

    // --- NPK ---
    if (npk !== undefined) {
      if (npk === null) {
        await npkRepo.delete({ analysis: { analysisId: mapped.analysisId } });
      } else if ((npk as any).analysisNpkId) {
        await npkRepo.update((npk as any).analysisNpkId, { ...npk });
      } else {
        await npkRepo.save(
          npkRepo.create({
            ...(npk as any),
            analysis: { analysisId: mapped.analysisId },
          }),
        );
      }
    }
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
    return entities
      ? entities.map((e) => AnalysisEntityMapper.toDomain(e))
      : null;
  }

  async findById(entity_id: AnalysisId): Promise<Analysis> {
    const entity = await this.ormRepository.findOne({
      where: { analysisId: entity_id.id },
      relations: ['liming', 'npk'],
    });

    return entity ? AnalysisEntityMapper.toDomain(entity) : null;
  }
}
