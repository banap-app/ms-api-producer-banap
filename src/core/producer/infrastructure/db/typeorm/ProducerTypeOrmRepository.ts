import { Repository } from 'typeorm';
import { Producer, ProducerId } from '../../../domain/Producer';
import { ProducerRepository } from '../../../domain/ProducerRepository';
import { ProducerEntity } from './ProducerEntity';
import { ProducerEntityTypeMapper } from './ProducerEntityTypeMapper';

export class ProducerTypeOrmRepository implements ProducerRepository {
  private ormRepository: Repository<ProducerEntity>;
  constructor(ormRepository: Repository<ProducerEntity>) {
    this.ormRepository = ormRepository;
  }
  async findByEmail(email: string): Promise<Producer> {
    const producer = await this.ormRepository.findOneBy({ email });
    return producer ? ProducerEntityTypeMapper.toDomain(producer) : null;
  }
  async insert(entity: Producer): Promise<void> {
    const producer = ProducerEntityTypeMapper.toTypeEntity(entity);
    await this.ormRepository.save(producer);
  }
  bulkInsert(entities: Producer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(entity: Producer): Promise<void> {
    const producer = ProducerEntityTypeMapper.toTypeEntity(entity);
    await this.ormRepository.update(
      { id: producer.id },
      producer,
    );
  }
  bulkUpdate(entities: Producer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(entity_id: ProducerId): Promise<void> {
    await this.ormRepository.delete({ id: entity_id.id });
  }
  bulkDelete(entities_ids: ProducerId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Producer[]> {
    throw new Error('Method not implemented.');
  }
  async findById(entity_id: ProducerId): Promise<Producer> {
    const producer = await this.ormRepository.findOne({
      where: {id: entity_id.id},
      relations: ['typeUser']

    });
    return ProducerEntityTypeMapper.toDomain(producer, { needPasswords: true });
  }
}
