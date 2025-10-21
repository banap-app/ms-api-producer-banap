import { Culture, PestProduct } from "./PestProduct";

export interface IPestProductGateway {
    search(culture: Culture): Promise<PestProduct | []>
}