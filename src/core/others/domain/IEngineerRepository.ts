import { IRepository } from 'src/core/shared/domain/repository/IRepository';
import { EngineerId, SimpleEngineer } from './SimpleEngineer';

export interface IEngineerRepository
  extends IRepository<SimpleEngineer, EngineerId> {}
