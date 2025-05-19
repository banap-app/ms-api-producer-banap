import { Password } from 'src/core/producer/domain/PasswordVo';
import { Producer, ProducerId } from '../../../domain/Producer';
import { ProfilePicture } from '../../../domain/ProfilePictureVo';
import { ProducerEntity } from './ProducerEntity';
import { TypeUser } from 'src/core/producer/domain/TypeUser';

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
      typeUser: producer.getTypeUser(),
    });
  }

  static toDomain(
    producerEntity: ProducerEntity,
    options: { needPasswords: boolean } = { needPasswords: false },
  ): Producer {
    const producer = new Producer({
      producerId: new ProducerId(producerEntity.producer_id),
      name: producerEntity.name,
      email: producerEntity.email,
      isActive: producerEntity.isActive,
      typeUser:
        producerEntity.typeUser.typeName == 'Producer'
          ? TypeUser.Producer
          : producerEntity.typeUser.typeName == 'Engineer'
            ? TypeUser.Engineer
            : TypeUser.NULL,
      password:
        options.needPasswords == true && producerEntity.password
          ? Password.hashPassword(producerEntity.password)
          : null,
      profilePicture: producerEntity.profilePicture
        ? new ProfilePicture({
            name: producerEntity.profilePicture.name,
            location: producerEntity.profilePicture.location,
          })
        : undefined,
    });

    producer.validate();

    if (producer.notification.hasErrors()) {
      throw new Error(producer.notification.toJSON());
    }
    return producer;
  }
}
