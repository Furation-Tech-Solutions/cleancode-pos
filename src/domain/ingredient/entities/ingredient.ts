// Express API request populate the Ingredient Model
export class IngredientModel {
  constructor(
    public name: string = "",
    public code: number = 0,
    public category: string[] = [],
    public PurchaseUnit: string[] = [],
    public ConsumptionUnit: string[] = [],
    public ConversionUnit: string = "",
    public PurchaseRate: number = 0,
    public costUnit: number = 0,
    public LowQty: number = 0,
    public del_status: boolean
  ) { }
}

// Ingredient Entity provided by Ingredient Repository is converted to Express API Response
export class IngredientEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public code: number,
    public category: string[],
    public PurchaseUnit: string[],
    public ConsumptionUnit: string[],
    public ConversionUnit: string,
    public PurchaseRate: number,
    public costUnit: number,
    public LowQty: number,
    public del_status: boolean
  ) { }
}



export class IngredientMapper {
  static toEntity( // (function method)
    ingredientData: any,
    includeId?: boolean,
    existingIngredient?: IngredientEntity
  ): IngredientEntity {
    if (existingIngredient != null) {
      // If existingIngredient is provided, merge the data from ingredientData with the existingIngredient
      return {
        ...existingIngredient,
        name:
          ingredientData.name !== undefined ? ingredientData.name : existingIngredient.name,
        code:
          ingredientData.code !== undefined ? ingredientData.code : existingIngredient.code,
        category:
          ingredientData.category !== undefined ? ingredientData.category : existingIngredient.category,
        PurchaseUnit:
          ingredientData.PurchaseUnit !== undefined ? ingredientData.PurchaseUnit : existingIngredient.PurchaseUnit,
        ConsumptionUnit:
          ingredientData.ConsumptionUnit !== undefined ? ingredientData.ConsumptionUnit : existingIngredient.ConsumptionUnit,
        ConversionUnit:
          ingredientData.ConversionUnit !== undefined ? ingredientData.ConversionUnit : existingIngredient.ConversionUnit,
        PurchaseRate:
          ingredientData.PurchaseRate !== undefined ? ingredientData.PurchaseRate : existingIngredient.PurchaseRate,
        costUnit:
          ingredientData.costUnit !== undefined ? ingredientData.costUnit : existingIngredient.costUnit,
        LowQty:
          ingredientData.LowQty !== undefined ? ingredientData.LowQty : existingIngredient.LowQty,
        del_status:
          ingredientData.del_status !== undefined ? ingredientData.del_status : existingIngredient.del_status

      };
    } else {
      // If existingIngredient is not provided, create a new IngredientEntity using ingredientData
      const ingredientEntity: IngredientEntity = {
        id: includeId ? (ingredientData._id ? ingredientData._id.toString() : undefined) : ingredientData._id.toString(),
        name: ingredientData.name,
        code: ingredientData.code,
        category: ingredientData.category,
        PurchaseUnit: ingredientData.PurchaseUnit,
        ConsumptionUnit: ingredientData.ConsumptionUnit,
        ConversionUnit: ingredientData.ConversionUnit,
        PurchaseRate: ingredientData.PurchaseRate,
        costUnit: ingredientData.costUnit,
        LowQty: ingredientData.LowQty,
        del_status: ingredientData.del_status
      };
      return ingredientEntity;
    }
  }

  static toModel(ingredient: IngredientEntity): any {
    return {
      id: ingredient.id,
      name: ingredient.name,
      code: ingredient.code,
      category: ingredient.category,
      PurchaseUnit: ingredient.PurchaseUnit,
      ConsumptionUnit: ingredient.ConsumptionUnit,
      ConversionUnit: ingredient.ConversionUnit,
      PurchaseRate: ingredient.PurchaseRate,
      costUnit: ingredient.costUnit,
      LowQty: ingredient.LowQty,
      del_status: ingredient.del_status
    };
  }
}
