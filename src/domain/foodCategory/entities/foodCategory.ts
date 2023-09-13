// Express API request populate the FoodCategory Model
export class FoodCategoryModel {
  constructor(
    // public parent_id: string = "",
    public foodCategory_Name: string = "",
    public description: string = "",
    public createdBy: Date,
    public del_status: boolean
  ) { }
}

// FoodCategory Entity provided by FoodCategory Repository is converted to Express API Response
export class FoodCategoryEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    // public parent_id: string,
    public foodCategory_Name: string,
    public description: string,
    public createdBy: Date,
    public del_status: boolean
  ) { }
}



export class FoodCategoryMapper {
  static toEntity( // (function method)
    foodCategoryData: any,
    includeId?: boolean,
    existingFoodCategory?: FoodCategoryEntity
  ): FoodCategoryEntity {
    if (existingFoodCategory != null) {
      // If existingFoodCategory is provided, merge the data from foodCategoryData with the existingFoodCategory
      return {
        ...existingFoodCategory,
        // parent_id:
        //   foodCategoryData.parent_id !== undefined ? foodCategoryData.parent_id : existingFoodCategory.parent_id,
        foodCategory_Name:
          foodCategoryData.foodCategory_Name !== undefined ? foodCategoryData.foodCategory_Name : existingFoodCategory.foodCategory_Name,
        description:
          foodCategoryData.description !== undefined ? foodCategoryData.description : existingFoodCategory.description,
        createdBy:
          foodCategoryData.createdBy !== undefined ? foodCategoryData.createdBy : existingFoodCategory.createdBy,
        del_status:
          foodCategoryData.del_status !== undefined ? foodCategoryData.del_status : existingFoodCategory.del_status
      };
    } else {
      // If existingFoodCategory is not provided, create a new FoodCategoryEntity using foodCategoryData
      const foodCategoryEntity: FoodCategoryEntity = {
        id: includeId ? (foodCategoryData._id ? foodCategoryData._id.toString() : undefined) : foodCategoryData._id.toString(),
        // parent_id: foodCategoryData.parent_id,
        foodCategory_Name: foodCategoryData.foodCategory_Name,
        description: foodCategoryData.description,
        createdBy: foodCategoryData.createdBy,
        del_status: foodCategoryData.del_status,
      };
      return foodCategoryEntity;
    }
  }

  static toModel(foodCategory: FoodCategoryEntity): any {
    return {
      id: foodCategory.id,
      // parent_id: foodCategory.parent_id,
      foodCategory_Name: foodCategory.foodCategory_Name,
      description: foodCategory.description,
      createdBy: foodCategory.createdBy,
      del_status: foodCategory.del_status,
    };
  }
}
