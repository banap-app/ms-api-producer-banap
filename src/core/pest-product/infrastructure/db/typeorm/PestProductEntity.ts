import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'pest-product'})
export class PestProductEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'pest_product_id'})
    pestProductId: string
}