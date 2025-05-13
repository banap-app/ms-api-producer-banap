import { Producer, ProducerId } from '../../../domain/Producer';
import { ProfilePicture } from '../../../domain/ProfilePictureVo';
import { ProducerEntity } from './ProducerEntity';

export class ProducerEntityTypeMapper {
  static toTypeEntity(producer: Producer): ProducerEntity {
    return ProducerEntity.fromDomain({
      producerId: producer.getId.toString(),
      name: producer.getName(),
      email: producer.getEmail(),
      isActive: producer.getIsActive(),
      createdAt: producer.getCreatedAt(),
      password: producer.getPassword() as any,
      deletedAt: producer.getDeletedAt(),
      updatedAt: producer.getUpdatedAt(),
      profilePicture: producer.getProfilePicture(),
    });
  }

  static toDomain(producerEntity: ProducerEntity): Producer {
    const producer = new Producer({
      producerId: new ProducerId(producerEntity.producer_id),
      name: producerEntity.name,
      email: producerEntity.email,
      isActive: producerEntity.isActive,
      password: null,
      profilePicture: producerEntity.profilePicture
        ? new ProfilePicture({
            name: producerEntity.profilePicture.name,
            location: producerEntity.profilePicture.location,
          })
        : undefined,
    });

    producer.validate(['name']);

    if (producer.notification.hasErrors()) {
      throw new Error(producer.notification.toJSON());
    }
    return producer;
  }
}
