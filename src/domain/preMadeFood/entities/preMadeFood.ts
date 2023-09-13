// Express API request populate the PreMadeFood Model
export class PreMadeFoodModel {
  constructor(
    public name: string = "",
    public code: string = "",
    public category: string[] = [],
    public ingredientConsumption: string[] = [],
    public consumptionUnit: string = "",
    public costPerUnit: number = 0,
    public lowQty: number = 0,
    public del_status: boolean
  ) { }
}

// preMadeFood Entity provided by preMadeFood Repository is converted to Express API Response
export class PreMadeFoodEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public code: string,
    public category: string[],
    public ingredientConsumption: string[],
    public consumptionUnit: string,
    public costPerUnit: number,
    public lowQty: number,
    public del_status: boolean
  ) { }
}


export class PreMadeFoodMapper {
  static toEntity(
    preMadeFoodData: any,
    includeId?: boolean,
    existingPreMadeFood?: PreMadeFoodEntity
  ): PreMadeFoodEntity {
    if (existingPreMadeFood != null) {
      // If existingPreMadeFood is provided, merge the data from preMadeFoodData with the existingPreMadeFood
      return {
        ...existingPreMadeFood,
        name:
          preMadeFoodData.name !== undefined ? preMadeFoodData.name : existingPreMadeFood.name,
        code:
          preMadeFoodData.code !== undefined ? preMadeFoodData.code : existingPreMadeFood.code,
        category:
          preMadeFoodData.category !== undefined ? preMadeFoodData.category : existingPreMadeFood.category,
        ingredientConsumption:
          preMadeFoodData.ingredientConsumption !== undefined ? preMadeFoodData.ingredientConsumption : existingPreMadeFood.ingredientConsumption,
        consumptionUnit:
          preMadeFoodData.consumptionUnit !== undefined ? preMadeFoodData.consumptionUnit : existingPreMadeFood.consumptionUnit,
        costPerUnit:
          preMadeFoodData.costPerUnit !== undefined ? preMadeFoodData.costPerUnit : existingPreMadeFood.costPerUnit,
        lowQty:
          preMadeFoodData.lowQty !== undefined ? preMadeFoodData.lowQty : existingPreMadeFood.lowQty,
        del_status:
          preMadeFoodData.del_status !== undefined ? preMadeFoodData.del_status : existingPreMadeFood.del_status
      };
    } else {
      // If existingPreMadeFood is not provided, create a new PreMadeFoodEntity using preMadeFoodData
      const PreMadeFoodEntity: PreMadeFoodEntity = {
        id: includeId ? (preMadeFoodData._id ? preMadeFoodData._id.toString() : undefined) : preMadeFoodData._id.toString(),
        name: preMadeFoodData.name,
        code: preMadeFoodData.code,
        category: preMadeFoodData.category,
        ingredientConsumption: preMadeFoodData.ingredientConsumption,
        consumptionUnit: preMadeFoodData.consumptionUnit,
        costPerUnit: preMadeFoodData.costPerUnit,
        lowQty: preMadeFoodData.lowQty,
        del_status: preMadeFoodData.del_status
      };
      return PreMadeFoodEntity;
    }
  }

  static toModel(preMadeFood: PreMadeFoodEntity): any {
    return {
      id: preMadeFood.id,
      name: preMadeFood.name,
      code: preMadeFood.code,
      category: preMadeFood.category,
      ingredientConsumption: preMadeFood.ingredientConsumption,
      consumptionUnit: preMadeFood.consumptionUnit,
      costPerUnit: preMadeFood.costPerUnit,
      lowQty: preMadeFood.lowQty,
      del_status: preMadeFood.del_status
    };
  }
}
