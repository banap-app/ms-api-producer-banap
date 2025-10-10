import { Entity } from 'src/core/shared/domain/Entity';
import { Uuid } from 'src/core/shared/domain/value-objects/UuidVo';

export type IndicationUse = {
  culture: string;
  plagueScientificName: string;
  pestCommonName: Array<string>;
};

export type PestProductConstructor = {
  pestProductId?: PestProductId;
  trademark: string;
  registrationHolder: string;
  biologicalProduct: boolean;
  agronomicCategoryClass: Array<string>;
  formulation: string;
  activeIngredient: Array<string>;
  modeAction?: Array<string>;
  applicationTechnique?: Array<string>;
  indicationUse: Array<IndicationUse>;
};

export type PestProductCreateCommand = {
  trademark: string;
  registrationHolder: string;
  biologicalProduct: boolean;
  agronomicCategoryClass: Array<string>;
  formulation: string;
  activeIngredient: Array<string>;
  modeAction?: Array<string>;
  applicationTechnique?: Array<string>;
  indicationUse: Array<IndicationUse>;
};

export class PestProductId extends Uuid {};

export class PestProduct extends Entity {
  private pestProductId: PestProductId;
  private trademark: string;
  private registrationHolder: string;
  private biologicalProduct: boolean;
  private agronomicCategoryClass: Array<string>;
  private formulation: string;
  private activeIngredient: Array<string>;
  private modeAction: Array<string> | [];
  private applicationTechnique: Array<string> | [];
  private indicationUse: Array<IndicationUse>;

  constructor(props: PestProductConstructor) {
    super()
    this.pestProductId = props.pestProductId ? props.pestProductId : new PestProductId()
    this.trademark = props.trademark
    this.registrationHolder = props.registrationHolder
    this.biologicalProduct = props.biologicalProduct
    this.agronomicCategoryClass = props.agronomicCategoryClass
    this.formulation = props.formulation
    this.activeIngredient = props.activeIngredient
    this.modeAction = props.modeAction
    this.applicationTechnique = props.applicationTechnique
    this.indicationUse = props.indicationUse
  }

  static create(props: PestProductCreateCommand): PestProduct {
    const pestProduct = new PestProduct(props)
    return pestProduct
  }

  get getId() {
    return this.pestProductId;
  }
  toJSON() {
    throw new Error('Method not implemented.');
  }
}
