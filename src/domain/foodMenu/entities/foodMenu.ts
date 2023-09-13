// Express API request populate the FoodMenu Model
export class FoodMenuModel {
  constructor(
    public name: string = "",
    public code: string = "",
    public cuisine: string[] = [],
    public subCategory: string[] = [],
    public ingredientConsumption: string[]  = [],
    public totalCostOfIngredients: number,
    public dineInPrice: number,
    public takeAwayPrice: number,
    public deliveryPrice: string[] = [],
    public description: string = "",
    public foodImage: string = "",
    public isItVeg: boolean,
    public isItBebrages: boolean,
    public del_status: boolean
  ) { }
}

// FoodMenu Entity provided by FoodMenu Repository is converted to Express API Response
export class FoodMenuEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public code: string,
    public cuisine: string[],
    public subCategory: string[],
    public ingredientConsumption: string[],
    public totalCostOfIngredients: number,
    public dineInPrice: number,
    public takeAwayPrice: number,
    public deliveryPrice: string[],
    public description: string,
    public foodImage: string,
    public isItVeg: boolean,
    public isItBebrages: boolean,
    public del_status: boolean
  ) { }
}


export class FoodMenuMapper {
  static toEntity(
    FoodMenuData: any,
    includeId?: boolean,
    existingFoodMenu?: FoodMenuEntity
  ): FoodMenuEntity {
    if (existingFoodMenu != null) {
      // If existingFoodMenu is provided, merge the data from FoodMenuData with the existingFoodMenu
      return {
        ...existingFoodMenu,
        name:
          FoodMenuData.name !== undefined ? FoodMenuData.name : existingFoodMenu.name,
          code:
          FoodMenuData.code !== undefined ? FoodMenuData.code : existingFoodMenu.code,
        cuisine:
          FoodMenuData.cuisine !== undefined ? FoodMenuData.cuisine : existingFoodMenu.cuisine,
        subCategory:
          FoodMenuData.subCategory !== undefined ? FoodMenuData.subCategory : existingFoodMenu.subCategory,
        ingredientConsumption:
          FoodMenuData.ingredientConsumption !== undefined ? FoodMenuData.ingredientConsumption : existingFoodMenu.ingredientConsumption,
        totalCostOfIngredients:
          FoodMenuData.totalCostOfIngredients !== undefined ? FoodMenuData.totalCostOfIngredients : existingFoodMenu.totalCostOfIngredients,
        dineInPrice:
          FoodMenuData.dineInPrice !== undefined ? FoodMenuData.dineInPrice : existingFoodMenu.dineInPrice,
        takeAwayPrice:
          FoodMenuData.takeAwayPrice !== undefined ? FoodMenuData.takeAwayPrice : existingFoodMenu.takeAwayPrice,
        deliveryPrice:
          FoodMenuData.deliveryPrice !== undefined ? FoodMenuData.deliveryPrice : existingFoodMenu.deliveryPrice,
        description:
          FoodMenuData.description !== undefined ? FoodMenuData.description : existingFoodMenu.description,
        del_status:
          FoodMenuData.del_status !== undefined ? FoodMenuData.del_status : existingFoodMenu.del_status
      };
    } else {
      // If existingFoodMenu is not provided, create a new FoodMenuEntity using FoodMenuData
      const FoodMenuEntity: FoodMenuEntity = {
        id: includeId ? (FoodMenuData._id ? FoodMenuData._id.toString() : undefined) : FoodMenuData._id.toString(),
        name: FoodMenuData.name,
        code: FoodMenuData.code,
        cuisine: FoodMenuData.cuisine,
        subCategory: FoodMenuData.subCategory,
        ingredientConsumption: FoodMenuData.ingredientConsumption,
        totalCostOfIngredients: FoodMenuData.totalCostOfIngredients,
        dineInPrice: FoodMenuData.dineInPrice,
        takeAwayPrice: FoodMenuData.takeAwayPrice,
        deliveryPrice: FoodMenuData.deliveryPrice,
        description: FoodMenuData.description,
        foodImage: FoodMenuData.foodImage,
        isItVeg: FoodMenuData.isItVeg,
        isItBebrages: FoodMenuData.isItBebrages,
        del_status: FoodMenuData.del_status
      };
      return FoodMenuEntity;
    }
  }

  static toModel(FoodMenu: FoodMenuEntity): any {
    return {
      id: FoodMenu.id,
      name: FoodMenu.name,
      code: FoodMenu.code,
      cuisine: FoodMenu.cuisine,
      subCategory: FoodMenu.subCategory,
      ingredientConsumption: FoodMenu.ingredientConsumption,
      totalCostOfIngredients: FoodMenu.totalCostOfIngredients,
      dineInPrice: FoodMenu.dineInPrice,
      takeAwayPrice: FoodMenu.takeAwayPrice,
      deliveryPrice: FoodMenu.deliveryPrice,
      description: FoodMenu.description,
      foodImage: FoodMenu.foodImage,
      isItVeg: FoodMenu.isItVeg,
      isItBebrages: FoodMenu.isItBebrages,
      del_status: FoodMenu.del_status
    };
  }
}
