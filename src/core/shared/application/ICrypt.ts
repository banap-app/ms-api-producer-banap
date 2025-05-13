export interface ICrypt {
    encode(rawData:string, saltQuantity: number): Promise<string>
    verify(rawData:string, hashData:string): Promise<boolean>
}