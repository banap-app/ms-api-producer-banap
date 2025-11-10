import {
  Culture,
  PestProduct,
  PestProductId,
} from 'src/core/pest-product/domain/PestProduct';
import { IPestProductRepository } from 'src/core/pest-product/domain/PestProductRepository';
import { Repository } from 'typeorm';
import { PestProductEntity } from './PestProductEntity';

export class PestProductTypeOrmRepository
  implements IPestProductRepository<PestProductId, PestProduct>
{
  private ormRepository: Repository<PestProductEntity>;

  constructor(ormRepository: Repository<PestProductEntity>) {
    this.ormRepository = ormRepository;
  }
  findById(id: PestProductId): Promise<PestProduct> {
    throw new Error('Method not implemented.');
  }
  findByCultureAndSearchTerm(
    culture: Culture,
    searchTerm: string,
  ): Promise<PestProduct | null> {
    throw new Error('Method not implemented.');
  }
  insert(pestProduct: PestProduct): Promise<Boolean> {
    throw new Error('Method not implemented.');
  }
}
