// Express API request DTO
export class InventoryItemModel {
  constructor(
    public companyId: string = "",
    public inventoryId: string = "",
    public items: InventoryItemModelItem[] = []
  ) {}
}

export class InventoryItemModelItem {
  constructor(
    public itemName: string = "",
    public totalQuantity: number = 0,
    public unitOfMeasurement: string = "",
    public supplierId: string = ""
  ) {}
}

// Inventory Item Entity provided by InventoryItem Repository is converted to Express API Response
export class InventoryItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public companyId: string,
    public inventoryId: string,
    public items: InventoryItemEntityItem[]
  ) {}
}

export class InventoryItemEntityItem {
  constructor(
    public itemName: string,
    public totalQuantity: number,
    public unitOfMeasurement: string,
    public supplierId: string
  ) {}
}

export class InventoryItemMapper {
  static toEntity(
    inventoryItemData: any,
    includeId?: boolean,
    existingInventoryItem?: InventoryItemEntity
  ): InventoryItemEntity {
    if (existingInventoryItem != null) {
      // If existingInventoryItem is provided, merge the data from inventoryItemData with the existingInventoryItem
      return {
        ...existingInventoryItem,
        companyId:
          inventoryItemData.companyId !== undefined
            ? inventoryItemData.companyId
            : existingInventoryItem.companyId,
        inventoryId:
          inventoryItemData.inventoryId !== undefined
            ? inventoryItemData.inventoryId
            : existingInventoryItem.inventoryId,
        items:
          inventoryItemData.items !== undefined
            ? inventoryItemData.items
            : existingInventoryItem.items,
      };
    } else {
      // If existingInventoryItem is not provided, create a new InventoryItemEntity using inventoryItemData
      const inventoryItemEntity: InventoryItemEntity = {
        id: includeId
          ? inventoryItemData._id
            ? inventoryItemData._id.toString()
            : undefined
          : undefined,
        companyId: inventoryItemData.companyId,
        inventoryId: inventoryItemData.inventoryId,
        items: inventoryItemData.items,
      };
      return inventoryItemEntity;
    }
  }

  static toModel(inventoryItem: InventoryItemEntity): any {
    return {
      id: inventoryItem.id,
      companyId: inventoryItem.companyId,
      inventoryId: inventoryItem.inventoryId,
      items: inventoryItem.items,
    };
  }
}
