import { IEngineerRepository } from '../../domain/IEngineerRepository';
import { SimpleEngineer, EngineerId } from '../../domain/SimpleEngineer';

export class EngineerGateway implements IEngineerRepository {
  insert(entity: SimpleEngineer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  bulkInsert(entities: SimpleEngineer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: SimpleEngineer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: SimpleEngineer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity_id: EngineerId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  bulkDelete(entities_ids: EngineerId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<SimpleEngineer[]> {
    throw new Error('Method not implemented.');
  }
  findById(entity_id: EngineerId): Promise<SimpleEngineer> {
    return Promise.resolve(
      new SimpleEngineer('563d234a-07b3-4bb8-b203-ec0949a497eb'),
    );
  }
}
