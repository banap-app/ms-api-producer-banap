import { Field } from '../../domain/Field';

export type FieldOutput = {
  id: string;
  propertyId: string;
  producerId: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export class FieldOutputMapper {
  static toOutput(entity: Field) {
    const { fieldId, ...otherProps } = entity.toJSON();

    return {
      id: fieldId,
      ...otherProps,
    };
  }
}
