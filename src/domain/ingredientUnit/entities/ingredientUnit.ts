// Express API request populate the IngredientUnit Model
export class IngredientUnitModel {
  constructor(
    public ingredientUnit_name: string = "",
    public description: string = "",
    public del_status: boolean
  ) { }
}

// IngredientUnit Entity provided by IngredientUnit Repository is converted to Express API Response
export class IngredientUnitEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public ingredientUnit_name: string,
    public description: string,
    public del_status: boolean
  ) { }
}



export class IngredientUnitMapper {
  static toEntity( // (function method)
    ingredientUnitData: any,
    includeId?: boolean,
    existingIngredientUnit?: IngredientUnitEntity
  ): IngredientUnitEntity {
    if (existingIngredientUnit != null) {
      // If existingIngredientUnit is provided, merge the data from ingredientUnitData with the existingIngredientUnit
      return {
        ...existingIngredientUnit,
        ingredientUnit_name:
          ingredientUnitData.ingredientUnit_name !== undefined ? ingredientUnitData.ingredientUnit_name : existingIngredientUnit.ingredientUnit_name,
        description:
          ingredientUnitData.description !== undefined ? ingredientUnitData.description : existingIngredientUnit.description,
        del_status:
          ingredientUnitData.del_status !== undefined ? ingredientUnitData.del_status : existingIngredientUnit.del_status,

      };
    } else {
      // If existingIngredientUnit is not provided, create a new IngredientUnitEntity using ingredientUnitData
      const ingredientUnitEntity: IngredientUnitEntity = {
        id: includeId ? (ingredientUnitData._id ? ingredientUnitData._id.toString() : undefined) : ingredientUnitData._id.toString(),
        ingredientUnit_name: ingredientUnitData.ingredientUnit_name,
        description: ingredientUnitData.description,
        del_status: ingredientUnitData.del_status,
      };
      return ingredientUnitEntity;
    }
  }

  static toModel(ingredientUnit: IngredientUnitEntity): any {
    return {
      id: ingredientUnit.id,
      ingredientUnit_name: ingredientUnit.ingredientUnit_name,
      description: ingredientUnit.description,
      del_status: ingredientUnit.del_status,
    };
  }
}
