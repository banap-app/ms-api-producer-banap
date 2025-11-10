import { UseCase } from 'src/core/shared/application/IUseCase';
import { PestProductOutput } from '../commons/PestProductOutputMapper';
import { IPestProductGateway } from 'src/core/pest-product/domain/PestProductGateway';
import { IPestProductRepository } from 'src/core/pest-product/domain/PestProductRepository';
import {
  PestProduct,
  PestProductId,
} from 'src/core/pest-product/domain/PestProduct';

export type CreatePestProductOutput = PestProductOutput;

export class CreatePestProductUseCase
  implements UseCase<null, CreatePestProductOutput>
{
  constructor(
    private readonly pestProductGateway: IPestProductGateway,
    private readonly pestProductRepository: IPestProductRepository<
      PestProductId,
      PestProduct
    >,
  ) {}
  async execute(aCommand: null): Promise<PestProductOutput> {
    const pestProductsToSanitize = await this.pestProductGateway.search(
      'ALL',
      null,
    );
    console.log(pestProductsToSanitize[0])
    if (Array.isArray(pestProductsToSanitize)) {
      pestProductsToSanitize.forEach((dirtyPestProduct) => {
        const pestProduct = PestProduct.create({
          culture: dirtyPestProduct['indicacao_uso'].map(
            (culture) => culture['cultura'],
          ),
        });
      });
    }
    return null;
  }
}
