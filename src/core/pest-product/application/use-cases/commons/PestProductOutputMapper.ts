import {
  Culture,
  IndicationUse,
  PestProduct,
} from 'src/core/pest-product/domain/PestProduct';

export type PestProductOutput = {
  id: string;
  culture?: Culture | Culture[];
  searchTerm?: string;
  trademark: string;
  registrationHolder: string;
  biologicalProduct: boolean;
  agronomicCategoryClass: Array<string>;
  formulation: string;
  activeIngredient: Array<string>;
  modeAction: Array<string> | [];
  applicationTechnique: Array<string> | [];
  indicationUse: Array<IndicationUse>;
};

export class PestProductOutputMapper {
  static toOutput(
    entity: PestProduct | PestProduct[],
  ): PestProductOutput | PestProductOutput[] {
    if (Array.isArray(entity)) {
      const pestProducts: PestProductOutput[] = entity.map((pestProduct) => {
        return {
          id: pestProduct.getId.id,
          activeIngredient: pestProduct.getActiveIngredient(),
          agronomicCategoryClass: pestProduct.getAgronomicCategoryClass(),
          applicationTechnique: pestProduct.getApplicationTechnique(),
          biologicalProduct: pestProduct.getBiologicalProduct(),
          formulation: pestProduct.getFormulation(),
          indicationUse: pestProduct.getIndicationUse(),
          modeAction: pestProduct.getModeAction(),
          registrationHolder: pestProduct.getRegistrationHolder(),
          trademark: pestProduct.getTrademark(),
          culture: pestProduct.getCulture(),
          searchTerm: pestProduct.getSearchTerm(),
        };
      });

      return pestProducts;
    } else {
      return {
        id: entity.getId.id,
        activeIngredient: entity.getActiveIngredient(),
        agronomicCategoryClass: entity.getAgronomicCategoryClass(),
        applicationTechnique: entity.getApplicationTechnique(),
        biologicalProduct: entity.getBiologicalProduct(),
        formulation: entity.getFormulation(),
        indicationUse: entity.getIndicationUse(),
        modeAction: entity.getModeAction(),
        registrationHolder: entity.getRegistrationHolder(),
        trademark: entity.getTrademark(),
        culture: entity.getCulture(),
        searchTerm: entity.getSearchTerm(),
      };
    }
  }
}
