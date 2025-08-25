import {
  Coordinate,
  FieldBoundary,
} from 'src/core/field/domain/FieldBoundaryVo';
import { FieldEntity, FieldEntityConstructorProps } from './FieldEntity';
import { Field, FieldId } from 'src/core/field/domain/Field';
import { FieldBoundaryEntity } from './FieldBoundaryEntity';
export class FieldEntityMapper {
  static toTypeEntity(entity: Field): FieldEntity {
    return FieldEntity.fromDomain({
      fieldId: entity.getId.id,
      crop: entity.getCrop(),
      description: entity.getDescription(),
      fieldBoundary: entity.getFieldBoundary(),
      isActive: entity.getIsActive(),
      name: entity.getName(),
      producerId: entity.getProducerId().id,
      propertyId: entity.getPropertyId().id,
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
      deletedAt: entity.getDeletedAt(),
    });
  }

  static toDomain(entity: FieldEntity): Field {
    const coords: Coordinate[] =
      entity.boundary?.boundary.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      })) || [];
    const field = new Field({
      fieldId: entity.fieldId,
      // @ts-ignore
      propertyId: entity.propertyId.propertyId,
      // @ts-ignore
      producerId: entity.producerId.id,
      name: entity.name,
      description: entity.description,
      crop: entity.crop,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      fieldBoundary: coords,
    });
    field.validate();

    if (field.notification.hasErrors()) {
      throw new Error(field.notification.toJSON());
    }

    return field;
  }

  static assignBoundary(entity: FieldEntity, coords: Coordinate[]): void {
    const voResult = FieldBoundary.create(coords);
    if (voResult.isFail()) {
      throw voResult.error;
    }
    const vo = voResult.ok;
    if (entity.boundary) {
      // Update the existing boundary entity's geometry
      entity.boundary.boundary = FieldBoundaryEntity.fromDomain(
        vo['points'],
      ).boundary;
    } else {
      // Create a new boundary entity if none exists
      entity.boundary = FieldBoundaryEntity.fromDomain(vo['points']);
      entity.boundary.field = entity;
    }
  }
}
