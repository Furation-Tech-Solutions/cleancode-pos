// Express API request populate the Veriations Model
export class VeriationsModel {
  constructor(
    public name: string = "",
    public foodMenuCode_byId: string[] = [],
    public dineInPrice: number,
    public takeAwayPrice: number,
    public deliveryPrice: string[] = [],
    public ingredientConsumption: string[] = [],
    public del_status: boolean
  ) { }
}

// veriations Entity provided by veriations Repository is converted to Express API Response
export class VeriationsEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public foodMenuCode_byId: string[],
    public dineInPrice: number,
    public takeAwayPrice: number,
    public deliveryPrice: string[],
    public ingredientConsumption: string[],
    public del_status: boolean
  ) { }
}


export class VeriationsMapper {
  static toEntity(
    veriationsData: any,
    includeId?: boolean,
    existingVeriations?: VeriationsEntity
  ): VeriationsEntity {
    if (existingVeriations != null) {
      // If existingVeriations is provided, merge the data from veriationsData with the existingVeriations
      return {
        ...existingVeriations,
        name:
          veriationsData.name !== undefined ? veriationsData.name : existingVeriations.name,
        foodMenuCode_byId:
          veriationsData.foodMenuCode_byId !== undefined ? veriationsData.foodMenuCode_byId : existingVeriations.foodMenuCode_byId,
        dineInPrice:
          veriationsData.dineInPrice !== undefined ? veriationsData.dineInPrice : existingVeriations.dineInPrice,
        takeAwayPrice:
          veriationsData.takeAwayPrice !== undefined ? veriationsData.takeAwayPrice : existingVeriations.takeAwayPrice,
        deliveryPrice:
          veriationsData.deliveryPrice !== undefined ? veriationsData.deliveryPrice : existingVeriations.deliveryPrice,
        ingredientConsumption:
          veriationsData.ingredientConsumption !== undefined ? veriationsData.ingredientConsumption : existingVeriations.ingredientConsumption,
        del_status:
          veriationsData.del_status !== undefined ? veriationsData.del_status : existingVeriations.del_status
      };
    } else {
      // If existingVeriations is not provided, create a new VeriationsEntity using veriationsData
      const VeriationsEntity: VeriationsEntity = {
        id: includeId ? (veriationsData._id ? veriationsData._id.toString() : undefined) : veriationsData._id.toString(),
        name: veriationsData.name,
        foodMenuCode_byId: veriationsData.foodMenuCode_byId,
        dineInPrice: veriationsData.dineInPrice,
        takeAwayPrice: veriationsData.takeAwayPrice,
        deliveryPrice: veriationsData.deliveryPrice,
        ingredientConsumption: veriationsData.ingredientConsumption,
        del_status: veriationsData.del_status
      };
      return VeriationsEntity;
    }
  }

  static toModel(veriations: VeriationsEntity): any {
    return {
      id: veriations.id,
      name: veriations.name,
      foodMenuCode_byId: veriations.foodMenuCode_byId,
      dineInPrice: veriations.dineInPrice,
      takeAwayPrice: veriations.takeAwayPrice,
      deliveryPrice: veriations.deliveryPrice,
      ingredientConsumption: veriations.ingredientConsumption,
      del_status: veriations.del_status
    };
  }
}
