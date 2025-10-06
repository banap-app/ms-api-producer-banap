import { UseCase } from 'src/core/shared/application/IUseCase';
import {
  FieldOutput,
  FieldOutputMapper,
} from '../../commons/FieldOutputMapper';
import { ListFieldsCommand } from './ListFieldsCommand';
import { NotFoundError } from 'src/core/shared/domain/errors/NotFoundError';
import { PropertyId } from 'src/core/property/domain/Property';
import { IFieldRepository } from 'src/core/field/domain/IFieldRepository';
import { IPropertyRepository } from 'src/core/property/domain/IPropertyRepository';
import { ICache } from 'src/core/shared/application/ICache';
import { Field } from 'src/core/field/domain/Field';

export type ListFieldOutput = FieldOutput[];

export class ListFieldUseCase
  implements UseCase<ListFieldsCommand, ListFieldOutput>
{
  private fieldRepository: IFieldRepository;
  private propertyRepository: IPropertyRepository;
  private cacheAdapter: ICache<Field>;

  constructor(
    fieldRepository: IFieldRepository,
    propertyRepository: IPropertyRepository,
    cacheAdapter: ICache<Field>,
  ) {
    this.fieldRepository = fieldRepository;
    this.propertyRepository = propertyRepository;
    this.cacheAdapter = cacheAdapter;
  }

  async execute(aCommand: ListFieldsCommand): Promise<ListFieldOutput> {
    if (await this.cacheAdapter.isCached(`field:${aCommand.propertyId}`)) {
      let fields = await this.cacheAdapter.get(`field:${aCommand.propertyId}`);

      fields = fields.entityArray.map(
        (field) =>
          new Field({
            fieldId: field.fieldId,
            crop: field.crop,
            description: field.description,
            fieldBoundary: field.fieldBoundary.points,
            isActive: field.isActive,
            name: field.name,
            producerId: field.producerId,
            propertyId: field.propertyId,
            createdAt: field.createdAt,
            updatedAt: field.updatedAt,
            deletedAt: field.deletedAt,
          }),
      );
      return fields
        .filter((field: Field) => field.getIsActive())
        .map((field: Field) => FieldOutputMapper.toOutput(field));
    }

    const property = await this.propertyRepository.findById(
      new PropertyId(aCommand.propertyId),
    );

    if (!property) {
      throw new NotFoundError('Property not found');
    }

    const fields = await this.fieldRepository.findByPropertyId(
      aCommand.propertyId,
    );
    await this.cacheAdapter.set({
      entityArray: fields,
      key: aCommand.propertyId,
    });
    return fields
      .filter((field) => field.getIsActive())
      .map((field) => FieldOutputMapper.toOutput(field));
  }
}
