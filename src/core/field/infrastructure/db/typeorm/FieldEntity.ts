import { InvalidFieldBoundaryError } from 'src/core/field/domain/errors/InvalidFieldBoundaryError';
import {
  Coordinate,
  FieldBoundary,
} from 'src/core/field/domain/FieldBoundaryVo';
import { ProducerEntity } from 'src/core/producer/infrastructure/db/typeorm/ProducerEntity';
import { PropertyEntity } from 'src/core/property/infrastructure/db/typeorm/PropertyEntity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Polygon,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldBoundaryEntity } from './FieldBoundaryEntity';

@Entity('fields')
export class FieldEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'field_id' })
  fieldId: string;

  @Column({ type: 'varchar', length: '40' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 40 })
  crop: string;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => FieldBoundaryEntity, (boundary) => boundary.field, {
    cascade: true,
    eager: true,
  })
  boundary: FieldBoundaryEntity;

  @OneToOne(() => ProducerEntity)
  @JoinColumn({ referencedColumnName: 'producer_id', name: 'producer_id' })
  producerId: string;
  @Column({ name: 'property_id' })
  propertyId: string;

  @ManyToOne(() => PropertyEntity, property => property.fields, {
    eager: true,
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  static fromDomain(props: FieldEntityConstructorProps): FieldEntity {
    const entity = new FieldEntity();
    entity.fieldId = props.fieldId;
    entity.producerId = props.producerId;
    entity.propertyId = props.propertyId;
    entity.boundary = props.fieldBoundary
      ? FieldBoundaryEntity.fromDomain(props.fieldBoundary.getPoints())
      : undefined;
    entity.name = props.name;
    entity.crop = props.crop;
    entity.description = props.description;
    entity.isActive = props.isActive;
    entity.createdAt = props.createdAt;
    entity.updatedAt = props.updatedAt;
    entity.deletedAt = props.deletedAt;
    return entity;
  }
}

export type FieldEntityConstructorProps = {
  fieldId?: string;
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  crop: string;
  fieldBoundary: FieldBoundary;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
