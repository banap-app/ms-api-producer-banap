import { ProducerId } from '../../../producer/domain/Producer';
import { Property } from '../../domain/Property';

export type PropertyOutput = {
  id: string;
  producerId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export class PropertyOutputMapper {
  static toOutput(entity: Property) {
    const { propertyId, ...otherProps } = entity.toJSON();

    return {
      id: propertyId,
      ...otherProps,
    };
  }
}
