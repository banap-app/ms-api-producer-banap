import { Entity } from 'src/core/shared/domain/Entity';
import { Uuid } from 'src/core/shared/domain/value-objects/UuidVo';
import { PestProductValidatorFactory } from './PestProductValidator';

export type IndicationUse = {
  culture: string;
  plagueScientificName: string;
  pestCommonName: Array<string>;
};

export enum Culture {
  Banana = 0,
  Arroz = 1,
}

export type PestProductConstructor = {
  pestProductId?: PestProductId;
  culture?: Culture | Culture[];
  searchTerm?: string;
  trademark?: string;
  registrationHolder?: string;
  biologicalProduct?: boolean;
  agronomicCategoryClass?: Array<string>;
  formulation?: string;
  activeIngredient?: Array<string>;
  modeAction?: Array<string>;
  applicationTechnique?: Array<string>;
  indicationUse?: Array<IndicationUse>;
};

export type PestProductCreateCommand = {
  culture?: Culture | Culture[];
  searchTerm?: string;
  trademark?: string;
  registrationHolder?: string;
  biologicalProduct?: boolean;
  agronomicCategoryClass?: Array<string>;
  formulation?: string;
  activeIngredient?: Array<string>;
  modeAction?: Array<string>;
  applicationTechnique?: Array<string>;
  indicationUse?: Array<IndicationUse>;
};

export class PestProductId extends Uuid {}

export class PestProduct extends Entity {
  private pestProductId: PestProductId;
  private trademark?: string;
  private culture?: Culture | Culture[];
  private searchTerm?: string;
  private registrationHolder?: string;
  private biologicalProduct?: boolean;
  private agronomicCategoryClass?: Array<string>;
  private formulation?: string;
  private activeIngredient?: Array<string>;
  private modeAction?: Array<string> | [];
  private applicationTechnique?: Array<string> | [];
  private indicationUse?: Array<IndicationUse>;

  constructor(props: PestProductConstructor) {
    super();
    this.pestProductId = props.pestProductId
      ? props.pestProductId
      : new PestProductId();
    this.trademark = props.trademark ? props.trademark : null;
    this.registrationHolder = props.registrationHolder
      ? props.registrationHolder
      : null;
    this.biologicalProduct = props.biologicalProduct
      ? props.biologicalProduct
      : null;
    this.agronomicCategoryClass = props.agronomicCategoryClass
      ? props.agronomicCategoryClass
      : null;
    this.formulation = props.formulation ? props.formulation : null;
    this.activeIngredient = props.activeIngredient
      ? props.activeIngredient
      : null;
    this.modeAction = props.modeAction ? props.modeAction : null;
    this.applicationTechnique = props.applicationTechnique
      ? props.applicationTechnique
      : null;
    this.indicationUse = props.indicationUse ? props.indicationUse : null;
    this.culture = props.culture ? props.culture : null;
    this.searchTerm = props.searchTerm ? props.searchTerm : null;
  }

  static create(props: PestProductCreateCommand): PestProduct {
    const pestProduct = new PestProduct(props);
    return pestProduct;
  }

  public getTrademark(): string {
    return this.trademark;
  }

  public validate(fields?: string[]) {
    const pestProductValidator = PestProductValidatorFactory.create();
    pestProductValidator.validate(this.notification, this, fields);
  }

  public getRegistrationHolder(): string {
    return this.registrationHolder;
  }

  public getBiologicalProduct(): boolean {
    return this.biologicalProduct;
  }

  public getAgronomicCategoryClass(): string[] {
    return this.agronomicCategoryClass;
  }

  public getFormulation(): string {
    return this.formulation;
  }

  public getCulture(): Culture | Culture[] {
    return this.culture;
  }

  public getSearchTerm(): string {
    return this.searchTerm;
  }

  public getActiveIngredient(): string[] {
    return this.activeIngredient;
  }

  public getModeAction(): string[] | [] {
    return this.modeAction;
  }

  public getApplicationTechnique(): string[] | [] {
    return this.applicationTechnique;
  }

  public getIndicationUse(): IndicationUse[] {
    return this.indicationUse;
  }

  get getId() {
    return this.pestProductId;
  }
  toJSON() {
    return {
      pestProductId: this.pestProductId.getId,
      trademark: this.trademark,
      registrationHolder: this.registrationHolder,
      biologicalProduct: this.biologicalProduct,
      agronomicCategoryClass: this.agronomicCategoryClass,
      formulation: this.formulation,
      activeIngredient: this.activeIngredient,
      modeAction: this.modeAction,
      applicationTechnique: this.applicationTechnique,
      indicationUse: this.indicationUse,
    };
  }
}
