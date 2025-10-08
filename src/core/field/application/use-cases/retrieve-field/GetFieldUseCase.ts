import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { Field, FieldId } from 'src/core/field/domain/Field';
import { EntityValidationError } from 'src/core/shared/domain/validators/ValidationErrors';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { ICache } from 'src/core/shared/application/ICache';

export class GetFieldUseCase
  implements UseCase<GetFieldCommand, GetFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private cacheAdapter: ICache<Field>;
  constructor(fieldRepository: IFieldRepository, cacheAdapter: ICache<Field>) {
    this.fieldRepository = fieldRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(aCommand: GetFieldCommand): Promise<GetFieldOutput> {
    if (await this.cacheAdapter.isCached(`field:${aCommand.fieldId}`)) {
      const fieldCached = await this.cacheAdapter.get(
        `field:${aCommand.fieldId}`,
      );

      const field = new Field({
        name: fieldCached.name,
        crop: fieldCached.crop,
        description: fieldCached.description,
        fieldBoundary: fieldCached.fieldBoundary.points,
        isActive: fieldCached.isActive,
        producerId: fieldCached.producerId,
        propertyId: fieldCached.propertyId,
        createdAt: fieldCached.createdAt,
        updatedAt: fieldCached.updatedAt,
        deletedAt: fieldCached.deletedAt,
        fieldId: new FieldId(fieldCached.fieldId),
      });

      return FieldOutputMapper.toOutput(field);
    }

    const field = await this.fieldRepository.findById(
      new FieldId(aCommand.fieldId),
    );
    if (!field) {
      throw new NotFoundError(`Not found a Field with ID: ${aCommand.fieldId}`);
    }

    field.validate();

    if (!field.getIsActive()) {
      throw new NotFoundError(`Not found a Field with ID: ${aCommand.fieldId}`);
    }
    if (field.notification.hasErrors()) {
      throw new EntityValidationError(field.notification.toJSON());
    }
    await this.cacheAdapter.set(field);
    return FieldOutputMapper.toOutput(field);
  }
}

export type GetFieldCommand = { fieldId: string };
export type GetFieldOutput = FieldOutput;
