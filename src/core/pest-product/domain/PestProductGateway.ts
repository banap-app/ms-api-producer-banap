import { Culture, PestProduct } from "./PestProduct";

export interface IPestProductGateway {
    search(culture: Culture | 'ALL', searchTerm: string | null): Promise<{}>
}