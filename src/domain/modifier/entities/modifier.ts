// Express API request populate the modifier Model
export class ModifierModel {
  constructor(
    public name: string = "",
    public salePrice: number = 0,
    public ingredientConsumption: string[] = [],
    public description: string = "",
    public totalCostOfIngredients: number = 0,
    public del_status: boolean
  ) { }
}

// modifier Entity provided by modifier Repository is converted to Express API Response
export class ModifierEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public salePrice: number,
    public ingredientConsumption: string[],
    public description: string,
    public totalCostOfIngredients: number,
    public del_status: boolean
  ) { }
}


export class ModifierMapper {
  static toEntity(
    modifierData: any,
    includeId?: boolean,
    existingModifier?: ModifierEntity
  ): ModifierEntity {
    if (existingModifier != null) {
      // If existingModifier is provided, merge the data from modifierData with the existingModifier
      return {
        ...existingModifier,
        name:
          modifierData.name !== undefined ? modifierData.name : existingModifier.name,
        salePrice:
          modifierData.salePrice !== undefined ? modifierData.salePrice : existingModifier.salePrice,
        ingredientConsumption:
          modifierData.ingredientConsumption !== undefined ? modifierData.ingredientConsumption : existingModifier.ingredientConsumption,
        description:
          modifierData.description !== undefined ? modifierData.description : existingModifier.description,
        totalCostOfIngredients:
          modifierData.totalCostOfIngredients !== undefined ? modifierData.totalCostOfIngredients : existingModifier.totalCostOfIngredients,
        del_status:
          modifierData.del_status !== undefined ? modifierData.del_status : existingModifier.del_status
      };
    } else {
      // If existingModifier is not provided, create a new ModifierEntity using modifierData
      const ModifierEntity: ModifierEntity = {
        id: includeId ? (modifierData._id ? modifierData._id.toString() : undefined) : modifierData._id.toString(),
        name: modifierData.name,
        salePrice: modifierData.salePrice,
        ingredientConsumption: modifierData.ingredientConsumption,
        description: modifierData.description,
        totalCostOfIngredients: modifierData.totalCostOfIngredients,
        del_status: modifierData.del_status
      };
      return ModifierEntity;
    }
  }

  static toModel(modifier: ModifierEntity): any {
    return {
      id: modifier.id,
      name: modifier.name,
      salePrice: modifier.salePrice,
      ingredientConsumption: modifier.ingredientConsumption,
      description: modifier.description,
      totalCostOfIngredients: modifier.totalCostOfIngredients,
      del_status: modifier.del_status
    };
  }
}
