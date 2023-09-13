// Express API request populate the FoodCombo Model
export class FoodComboModel {
  constructor(
    public name: string = "",
    public code: string = "",
    public food_category: string = "",
    public foodMenu: FoodMenuModelItem[] = [],
    public Dine_price: number = 0,
    public Takeaway_price: number = 0,
    public Delivery_price: DeliveryPriceModelName[] = [],
    public description: string = "",
    public isVeg: boolean,
    public isBeverage: boolean,
    public outlet: string[] = [],
    public del_status: boolean
  ) { }
}

export class FoodMenuModelItem {
  constructor(
    public food_item: string = "",
    public quantity: number = 0
  ) {}
}

export class DeliveryPriceModelName {
  constructor(
    public deliveryPartnerName: string = "",
    public price: number = 0
  ) {}
}

// FoodCombo Entity provided by FoodCombo Repository is converted to Express API Response
export class FoodComboEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public code: string,
    public food_category: string,
    public foodMenu: FoodMenuEntityItem[],
    public Dine_price: number,
    public Takeaway_price: number,
    public Delivery_price: DeliveryPriceEntityName[],
    public description: string,
    public isVeg: boolean,
    public isBeverage: boolean,
    public outlet: string[],
    public del_status: boolean
  ) { }
}

export class FoodMenuEntityItem {
  constructor(
    public food_item: string,
    public quantity: number,
  ) {}
}

export class DeliveryPriceEntityName {
  constructor(
    public deliveryPartnerName: string,
    public price: number
  ) {}
}


export class FoodComboMapper {
  static toEntity(
    foodComboData: any,
    includeId?: boolean,
    existingFoodCombo?: FoodComboEntity
  ): FoodComboEntity {
    if (existingFoodCombo != null) {
      // If existingFoodCombo is provided, merge the data from foodComboData with the existingFoodCombo
      return {
        ...existingFoodCombo,
        name:
          foodComboData.name !== undefined 
            ? foodComboData.name 
            : existingFoodCombo.name,
        code:
          foodComboData.code !== undefined 
            ? foodComboData.code 
            : existingFoodCombo.code,
        food_category:
          foodComboData.food_category !== undefined 
            ? foodComboData.food_category 
            : existingFoodCombo.food_category,
        foodMenu:
            foodComboData.foodMenu !== undefined
              ? foodComboData.foodMenu.food_item
              : existingFoodCombo.foodMenu,
        Dine_price:
          foodComboData.Dine_price !== undefined 
            ? foodComboData.Dine_price 
            : existingFoodCombo.Dine_price,
        Takeaway_price:
          foodComboData.Takeaway_price !== undefined 
            ? foodComboData.Takeaway_price 
            : existingFoodCombo.Takeaway_price,
        Delivery_price:
            foodComboData.Delivery_price !== undefined
              ? foodComboData.Delivery_price.deliveryPartnerName
              : existingFoodCombo.Delivery_price,
        description:
          foodComboData.description !== undefined 
            ? foodComboData.description 
            : existingFoodCombo.description,
        isVeg:
          foodComboData.isVeg !== undefined 
            ? foodComboData.isVeg 
            : existingFoodCombo.isVeg,
        isBeverage:
        foodComboData.isBeverage !== undefined 
            ? foodComboData.isBeverage 
            : existingFoodCombo.isBeverage,
        outlet:
          foodComboData.outlet !== undefined 
            ? foodComboData.outlet 
            : existingFoodCombo.outlet,
        del_status:
          foodComboData.del_status !== undefined 
            ? foodComboData.del_status 
            : existingFoodCombo.del_status
      };
    } else {
      // If existingFoodCombo is not provided, create a new FoodComboEntity using FoodComboData
      const FoodComboEntity: FoodComboEntity = {
        id: includeId ? (foodComboData._id ? foodComboData._id.toString() : undefined) : foodComboData._id.toString(),
        name: foodComboData.name,
        code: foodComboData.code,
        food_category: foodComboData.food_category,
        foodMenu: foodComboData.foodMenu,
        Dine_price: foodComboData.Dine_price,
        Takeaway_price: foodComboData.Takeaway_price,
        Delivery_price: foodComboData.Delivery_price,
        description: foodComboData.description,
        isVeg: foodComboData.isVeg,
        isBeverage: foodComboData.isBeverage,
        outlet: foodComboData.outlet,
        del_status: foodComboData.del_status
      };
      return FoodComboEntity;
    }
  }

  static toModel(foodCombo: FoodComboEntity): any {
    return {
      id: foodCombo.id,
      name: foodCombo.name,
      code: foodCombo.code,
      food_category: foodCombo.food_category,
      foodMenu: foodCombo.foodMenu,
      Dine_price: foodCombo.Dine_price,
      Takeaway_price: foodCombo.Takeaway_price,
      Delivery_price: foodCombo.Delivery_price,
      description: foodCombo.description,
      isVeg: foodCombo.isVeg,
      isBeverage: foodCombo.isBeverage,
      outlet: foodCombo.outlet,
      del_status: foodCombo.del_status
    };
  }
}
