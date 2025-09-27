import { Property } from 'src/core/property/domain/Property';
import { PropertyEntity } from './PropertyEntity';

export class PropertyEntityTypeMapper {
  static toTypeEntity(property: Property): PropertyEntity {
    return PropertyEntity.fromDomain({
      propertyId: property.getId.toString(),
      producerId: property.getProducerId().toString(),
      engineerId: property.getEngineerId()
        ? property.getEngineerId().toString()
        : null,
      name: property.getName(),
      isActive: property.getIsActive(),
      createdAt: property.getCreatedAt(),
      updatedAt: property.getUpdatedAt(),
      deletedAt: property.getDeletedAt(),
    });
  }

  static toDomain(entity: PropertyEntity): Property {
    const property = new Property({
      propertyId: entity.propertyId,
      producerId: entity.producerId,
      name: entity.name,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });

    property.validate([]);

    if (property.notification.hasErrors()) {
      throw new Error(property.notification.toJSON());
    }

    return property;
  }
}
