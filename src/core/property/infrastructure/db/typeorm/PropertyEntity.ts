import { FieldEntity } from 'src/core/field/infrastructure/db/typeorm/FieldEntity';
import { Producer } from 'src/core/producer/domain/Producer';
import { ProducerEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type PropertyConstructorProps = {
  propertyId: string;
  producerId: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

@Entity({ name: 'property' })
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'property_id' })
  propertyId: string;

  @Column({ name: 'producer_id' })
  producerId: string;

  @ManyToOne(() => ProducerEntity, (producer) => producer.producer_id)
  @JoinColumn({ name: 'producer_id' })
  producer: ProducerEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => require("../../../../field/infrastructure/db/typeorm/FieldEntity").FieldEntity, (field: any) => field.property)
  fields: any[];

  static fromDomain(props: PropertyConstructorProps): PropertyEntity {
    const entity = new PropertyEntity();

    entity.propertyId = props.propertyId;
    entity.producerId = props.producerId;
    entity.name = props.name;
    entity.isActive = props.isActive;
    entity.createdAt = props.createdAt;
    entity.updatedAt = props.updatedAt;
    entity.deletedAt = props.deletedAt;

    return entity;
  }
}
