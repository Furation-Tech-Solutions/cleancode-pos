// Express API request populate the outletStock Model
export class OutletStockModel {
  constructor(
    public outletCode_byId: string[] = [],
    public items: string = "",
    public qty: number = 0,
    public flag: string = "",
    public del_status: boolean
  ) { }
}

// outletStock Entity provided by outletStock Repository is converted to Express API Response
export class OutletStockEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public outletCode_byId: string[],
    public items: string,
    public qty: number,
    public flag: string,
    public del_status: boolean
  ) { }
}


export class OutletStockMapper {
  static toEntity(
    outletStockData: any,
    includeId?: boolean,
    existingOutletStock?: OutletStockEntity
  ): OutletStockEntity {
    if (existingOutletStock != null) {
      // If existingOutletStock is provided, merge the data from outletStockData with the existingOutletStock
      return {
        ...existingOutletStock,
        outletCode_byId:
          outletStockData.outletCode_byId !== undefined ? outletStockData.outletCode_byId : existingOutletStock.outletCode_byId,
        items:
          outletStockData.items !== undefined ? outletStockData.items : existingOutletStock.items,
        qty:
          outletStockData.qty !== undefined ? outletStockData.qty : existingOutletStock.qty,
        flag:
          outletStockData.flag !== undefined ? outletStockData.flag : existingOutletStock.flag,
        del_status:
          outletStockData.del_status !== undefined ? outletStockData.del_status : existingOutletStock.del_status
      };
    } else {
      // If existingOutletStock is not provided, create a new OutletStockEntity using outletStockData
      const OutletStockEntity: OutletStockEntity = {
        id: includeId ? (outletStockData._id ? outletStockData._id.toString() : undefined) : outletStockData._id.toString(),
        outletCode_byId: outletStockData.outletCode_byId,
        items: outletStockData.items,
        qty: outletStockData.qty,
        flag: outletStockData.flag,
        del_status: outletStockData.del_status
      };
      return OutletStockEntity;
    }
  }

  static toModel(outletStock: OutletStockEntity): any {
    return {
      id: outletStock.id,
      outletCode_byId: outletStock.outletCode_byId,
      items: outletStock.items,
      qty: outletStock.qty,
      flag: outletStock.flag,
      del_status: outletStock.del_status
    };
  }
}
