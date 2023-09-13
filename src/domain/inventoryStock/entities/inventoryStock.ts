// Express API request DTO
export class InventoryStockModel {
  constructor(
    public inventoryId: string = "",
    public items: InventoryStockModelItem[] = []
  ) {}
}

export class InventoryStockModelItem {
  constructor(
    public itemName: string = "",
    public totalQuantity: number = 0,
    public unitOfMeasurement: string = "",
    public alertQuantity: number = 0,
    public minimumQuantity: number = 0
  ) {}
}

// Inventory Stock Entity provided by InventoryStock Repository is converted to Express API Response
export class InventoryStockEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryId: string,
    public items: InventoryStockEntityItem[]
  ) {}
}

export class InventoryStockEntityItem {
  constructor(
    public itemName: string,
    public totalQuantity: number,
    public unitOfMeasurement: string,
    public alertQuantity: number,
    public minimumQuantity: number
  ) {}
}

export class InventoryStockMapper {
  static toEntity(
    inventoryStockData: any,
    includeId?: boolean,
    existingInventoryStock?: InventoryStockEntity
  ): InventoryStockEntity {
    if (existingInventoryStock != null) {
      // If existingInventoryStock is provided, merge the data from inventoryStockData with the existingInventoryStock
      return {
        ...existingInventoryStock,
        inventoryId:
          inventoryStockData.inventoryId !== undefined
            ? inventoryStockData.inventoryId
            : existingInventoryStock.inventoryId,
        items:
          inventoryStockData.items !== undefined
            ? inventoryStockData.items
            : existingInventoryStock.items,
      };
    } else {
      // If existingInventoryStock is not provided, create a new InventoryStockEntity using inventoryStockData
      const inventoryStockEntity: InventoryStockEntity = {
        id: includeId
          ? inventoryStockData._id
            ? inventoryStockData._id.toString()
            : undefined
          : inventoryStockData._id.toString(),
        inventoryId: inventoryStockData.inventoryId,
        items: inventoryStockData.items,
      };
      return inventoryStockEntity;
    }
  }

  static toModel(inventoryStock: InventoryStockEntity): any {
    return {
      inventoryId: inventoryStock.inventoryId,
      items: inventoryStock.items,
    };
  }
}
