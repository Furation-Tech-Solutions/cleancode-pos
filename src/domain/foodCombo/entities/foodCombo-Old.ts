// Express API request populate the FoodCombo Model
export class FoodComboModel {
  constructor(
    public name: string = "",
    public code: string = "",
    public food_category: string = "",
    public foodMenu: {
      food_item: string,
      quantity: number,
    }[] = [],
    public Dine_price: number = 0,
    public Takeaway_price: number = 0,
    public Delivery_price: {
      deliveryPartnerName: string,
      price: number,
    }[] = [],
    public description: string = "",
    public isVeg: boolean,
    public isBeverage: boolean,
    public outlet: string = "",
    public del_status: boolean
  ) { }
}

// FoodCombo Entity provided by FoodCombo Repository is converted to Express API Response
export class FoodComboEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public code: string,
    public food_category: string,
    public foodMenu: {
      food_item: string,
      quantity: number,
    }[] = [],
    public Dine_price: number,
    public Takeaway_price: number,
    public Delivery_price: {
      deliveryPartnerName: string,
      price: number,
    }[] = [],
    public description: string,
    public isVeg: boolean,
    public isBeverage: boolean,
    public outlet: string,
    public del_status: boolean
  ) { }
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
        foodMenu: [{
          food_item:
            foodComboData.FoodCombo !== undefined
              ? foodComboData.FoodCombo.food_item
              : existingFoodCombo.foodMenu[0].food_item,
          quantity:
            foodComboData.FoodCombo !== undefined
              ? foodComboData.FoodCombo.quantity
              : existingFoodCombo.foodMenu[0].quantity
        }],
        Dine_price:
          foodComboData.Dine_price !== undefined 
            ? foodComboData.Dine_price 
            : existingFoodCombo.Dine_price,
        Takeaway_price:
          foodComboData.Takeaway_price !== undefined 
            ? foodComboData.Takeaway_price 
            : existingFoodCombo.Takeaway_price,
        Delivery_price: [{
          deliveryPartnerName:
            foodComboData.Delivery_price !== undefined
              ? foodComboData.Delivery_price.deliveryPartnerName
              : existingFoodCombo.Delivery_price[0].deliveryPartnerName,
          price:
            foodComboData.Delivery_price !== undefined
              ? foodComboData.Delivery_price.price
              : existingFoodCombo.Delivery_price[0].price
        }],
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
        id: includeId ? (foodComboData._id ? foodComboData._id.toString() : undefined) : undefined,
        name: foodComboData.name,
        code: foodComboData.code,
        food_category: foodComboData.food_category,
        foodMenu: [{
          food_item: foodComboData.foodMenu.food_item,
          quantity: foodComboData.foodMenu.quantity
        }],
        Dine_price: foodComboData.Dine_price,
        Takeaway_price: foodComboData.Takeaway_price,
        Delivery_price: [{
          deliveryPartnerName: foodComboData.Delivery_price.deliveryPartnerName,
          price: foodComboData.Delivery_price.price,
        }],
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
      foodMenu: [{
        food_item: foodCombo.foodMenu[0].food_item,
        quantity: foodCombo.foodMenu[0].quantity
      }],
      Dine_price: foodCombo.Dine_price,
      Takeaway_price: foodCombo.Takeaway_price,
      Delivery_price: [{
        deliveryPartnerName: foodCombo.Delivery_price[0].deliveryPartnerName,
        price: foodCombo.Delivery_price[0].price,
      }],
      description: foodCombo.description,
      isVeg: foodCombo.isVeg,
      isBeverage: foodCombo.isBeverage,
      outlet: foodCombo.outlet,
      del_status: foodCombo.del_status
    };
  }
}
