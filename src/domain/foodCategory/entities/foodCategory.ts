// Express API request populate the FoodCategory Model
export class FoodCategoryModel {
  constructor(
    public foodCategory_Name: string = "",
    public description: string = "",
    public createdAt: string = "",
    public updatedAt: string = "",
    public kitchen: string = "",
    public del_status: boolean
  ) { }
}

// FoodCategory Entity provided by FoodCategory Repository is converted to Express API Response
export class FoodCategoryEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public foodCategory_Name: string,
    public description: string,
    public createdAt: string,
    public updatedAt: string,
    public kitchen: string,
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
        foodCategory_Name:
          foodCategoryData.foodCategory_Name !== undefined ? foodCategoryData.foodCategory_Name : existingFoodCategory.foodCategory_Name,
        description:
          foodCategoryData.description !== undefined ? foodCategoryData.description : existingFoodCategory.description,
        createdAt:
          foodCategoryData.createdAt !== undefined ? foodCategoryData.createdAt : existingFoodCategory.createdAt,
        updatedAt:
          foodCategoryData.updatedAt !== undefined ? foodCategoryData.updatedAt : existingFoodCategory.updatedAt,
        kitchen:
          foodCategoryData.kitchen !== undefined ? foodCategoryData.kitchen : existingFoodCategory.kitchen,
        del_status:
          foodCategoryData.del_status !== undefined ? foodCategoryData.del_status : existingFoodCategory.del_status
      };
    } else {
      // If existingFoodCategory is not provided, create a new FoodCategoryEntity using foodCategoryData
      const foodCategoryEntity: FoodCategoryEntity = {
        id: includeId ? (foodCategoryData._id ? foodCategoryData._id.toString() : undefined) : undefined,
        foodCategory_Name: foodCategoryData.foodCategory_Name,
        description: foodCategoryData.description,
        createdAt: foodCategoryData.createdAt,
        updatedAt: foodCategoryData.updatedAt,
        kitchen: foodCategoryData.kitchen,
        del_status: foodCategoryData.del_status,
      };
      return foodCategoryEntity;
    }
  }

  static toModel(foodCategory: FoodCategoryEntity): any {
    return {
      id: foodCategory.id,
      foodCategory_Name: foodCategory.foodCategory_Name,
      description: foodCategory.description,
      createdAt: foodCategory.createdAt,
      updatedAt: foodCategory.updatedAt,
      kitchen: foodCategory.kitchen,
      del_status: foodCategory.del_status,
    };
  }
}
