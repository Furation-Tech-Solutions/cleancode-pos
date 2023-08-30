// Express API request DTO
export class PurchaseItemModel {
  constructor(
    public companyId: string | null = null,
    public inventoryId: string = "",
    public items: PurchaseItemModelItem[] = []
  ) {}
}

export class PurchaseItemModelItem {
  constructor(
    public itemName: string = "",
    public totalQuantity: number = 0,
    public unitOfMeasurement: string = "",
    public supplierId: string = ""
  ) {}
}

// Purchase Item Entity provided by PurchaseItem Repository is converted to Express API Response
export class PurchaseItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public companyId: string | null = null,
    public inventoryId: string,
    public items: PurchaseItemEntityItem[]
  ) {}
}

export class PurchaseItemEntityItem {
  constructor(
    public itemName: string,
    public totalQuantity: number,
    public unitOfMeasurement: string,
    public supplierId: string
  ) {}
}

export class PurchaseItemMapper {
  static toEntity(
    purchaseItemData: any,
    includeId?: boolean,
    existingPurchaseItem?: PurchaseItemEntity
  ): PurchaseItemEntity {
    if (existingPurchaseItem != null) {
      // If existingPurchaseItem is provided, merge the data from purchaseItemData with the existingPurchaseItem
      return {
        ...existingPurchaseItem,
        companyId:
          purchaseItemData.companyId !== undefined
            ? purchaseItemData.companyId
            : existingPurchaseItem.companyId,
        inventoryId:
          purchaseItemData.inventoryId !== undefined
            ? purchaseItemData.inventoryId
            : existingPurchaseItem.inventoryId,
        items:
          purchaseItemData.items !== undefined
            ? purchaseItemData.items
            : existingPurchaseItem.items,
      };
    } else {
      // If existingPurchaseItem is not provided, create a new PurchaseItemEntity using purchaseItemData
      const purchaseItemEntity: PurchaseItemEntity = {
        id: includeId
          ? purchaseItemData._id
            ? purchaseItemData._id.toString()
            : undefined
          : undefined,
        companyId: purchaseItemData.companyId,
        inventoryId: purchaseItemData.inventoryId,
        items: purchaseItemData.items,
      };
      return purchaseItemEntity;
    }
  }

  static toModel(purchaseItem: PurchaseItemEntity): any {
    return {
      id: purchaseItem.id,
      companyId: purchaseItem.companyId,
      inventoryId: purchaseItem.inventoryId,
      items: purchaseItem.items,
    };
  }
}
