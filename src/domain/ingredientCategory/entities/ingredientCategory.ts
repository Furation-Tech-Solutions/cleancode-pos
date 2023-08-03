// Express API request populate the IngredientCategory Model
export class IngredientCategoryModel {
  constructor(
    public ingredientCategory_name: string = "",
    public description: string = "",
    public company_id: string = "",
    public del_status: string = ""
  ) { }
}

// IngredientCategory Entity provided by IngredientCategory Repository is converted to Express API Response
export class IngredientCategoryEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public ingredientCategory_name: string,
    public description: string,
    public company_id: string,
    public del_status: string
  ) { }
}



export class IngredientCategoryMapper {
  static toEntity( // (function method)
    ingredientCategoryData: any,
    includeId?: boolean,
    existingIngredientCategory?: IngredientCategoryEntity
  ): IngredientCategoryEntity {
    if (existingIngredientCategory != null) {
      // If existingIngredientCategory is provided, merge the data from ingredientCategoryData with the existingIngredientCategory
      return {
        ...existingIngredientCategory,
        ingredientCategory_name:
          ingredientCategoryData.ingredientCategory_name !== undefined ? ingredientCategoryData.ingredientCategory_name : existingIngredientCategory.ingredientCategory_name,
        description:
          ingredientCategoryData.description !== undefined ? ingredientCategoryData.description : existingIngredientCategory.description,
        company_id:
          ingredientCategoryData.company_id !== undefined ? ingredientCategoryData.company_id : existingIngredientCategory.company_id,
        del_status:
          ingredientCategoryData.del_status !== undefined ? ingredientCategoryData.del_status : existingIngredientCategory.del_status,

      };
    } else {
      // If existingIngredientCategory is not provided, create a new IngredientCategoryEntity using ingredientCategoryData
      const ingredientCategoryEntity: IngredientCategoryEntity = {
        id: includeId ? (ingredientCategoryData._id ? ingredientCategoryData._id.toString() : undefined) : undefined,
        ingredientCategory_name: ingredientCategoryData.ingredientCategory_name,
        description: ingredientCategoryData.description,
        company_id: ingredientCategoryData.company_id,
        del_status: ingredientCategoryData.del_status,
      };
      return ingredientCategoryEntity;
    }
  }

  static toModel(ingredientCategory: IngredientCategoryEntity): any {
    return {
      id: ingredientCategory.id,
      ingredientCategory_name: ingredientCategory.ingredientCategory_name,
      description: ingredientCategory.description,
      company_id: ingredientCategory.company_id,
      del_status: ingredientCategory.del_status,
    };
  }
}
