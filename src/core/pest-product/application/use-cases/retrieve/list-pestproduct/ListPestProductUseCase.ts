import { UseCase } from "src/core/shared/application/IUseCase";
import { PestProductOutput, PestProductOutputMapper } from "../../commons/PestProductOutputMapper";
import { ListPestProductCommand } from "./ListPestProductCommand";
import { Culture, PestProduct } from "src/core/pest-product/domain/PestProduct";
import { ICache } from "src/core/shared/application/ICache";
import { IPestProductGateway } from "src/core/pest-product/domain/PestProductGateway";

export type ListPestProductOutput = PestProductOutput | PestProductOutput[]

export class ListPestProductUseCase implements UseCase<ListPestProductCommand,ListPestProductOutput>  {
    constructor(private cacheAdapter:ICache<PestProduct>, private pestProductGateway: IPestProductGateway) {}
    async execute(aCommand: ListPestProductCommand): Promise<ListPestProductOutput> {
        const aCulture = Culture[aCommand.culture]
        const aSearchTerm = aCommand.searchTerm

        const aPestProduct = PestProduct.create({culture: aCulture, searchTerm: aSearchTerm})
        if (await this.cacheAdapter.isCached(``)) {

        }

        const pestProducts = await this.pestProductGateway.search(aCulture)

        if (!pestProducts) {
            throw new Error('Not found pest product')
        }

        return PestProductOutputMapper.toOutput(pestProducts)
    }

}