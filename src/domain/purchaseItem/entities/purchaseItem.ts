// Express API request DTO
export class PurchaseItemModel {
  constructor(
    public purchaseid: string = "",
    public itemid: string = "",
    public quantity: number = 0,
    public unitOfMeasurement: string = "",
    public price: number = 0,
    public date: string = "",
    public modifiedAt: Date = new Date(),
    public modifiedBy: string = ""
  ) {}
}

// Purchase Item Entity provided by PurchaseItem Repository is converted to Express API Response
export class PurchaseItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public purchaseid: string,
    public itemid: string,
    public quantity: number,
    public unitOfMeasurement: string,
    public price: number,
    public date: string,
    public modifiedAt: Date,
    public modifiedBy: string
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
        purchaseid:
          purchaseItemData.purchaseid !== undefined
            ? purchaseItemData.purchaseid
            : existingPurchaseItem.purchaseid,
        itemid:
          purchaseItemData.itemid !== undefined
            ? purchaseItemData.itemid
            : existingPurchaseItem.itemid,
        quantity:
          purchaseItemData.quantity !== undefined
            ? purchaseItemData.quantity
            : existingPurchaseItem.quantity,
        unitOfMeasurement:
          purchaseItemData.unitOfMeasurement !== undefined
            ? purchaseItemData.unitOfMeasurement
            : existingPurchaseItem.unitOfMeasurement,
        price:
          purchaseItemData.price !== undefined
            ? purchaseItemData.price
            : existingPurchaseItem.price,
        date:
          purchaseItemData.date !== undefined
            ? purchaseItemData.date
            : existingPurchaseItem.date,
        modifiedAt:
          purchaseItemData.modifiedAt !== undefined
            ? purchaseItemData.modifiedAt
            : existingPurchaseItem.modifiedAt,
        modifiedBy:
          purchaseItemData.modifiedBy !== undefined
            ? purchaseItemData.modifiedBy
            : existingPurchaseItem.modifiedBy,
      };
    } else {
      // If existingPurchaseItem is not provided, create a new PurchaseItemEntity using purchaseItemData
      const purchaseItemEntity: PurchaseItemEntity = {
        id: includeId
          ? purchaseItemData._id
            ? purchaseItemData._id.toString()
            : undefined
          : purchaseItemData._id.toString(),
        purchaseid: purchaseItemData.purchaseid,
        itemid: purchaseItemData.itemid,
        quantity: purchaseItemData.quantity,
        unitOfMeasurement: purchaseItemData.unitOfMeasurement,
        price: purchaseItemData.price,
        date: purchaseItemData.date,
        modifiedAt: purchaseItemData.modifiedAt,
        modifiedBy: purchaseItemData.modifiedBy,
      };
      return purchaseItemEntity;
    }
  }

  static toModel(purchaseItem: PurchaseItemEntity): any {
    return {
      id: purchaseItem.id,
      purchaseid: purchaseItem.purchaseid,
      itemid: purchaseItem.itemid,
      quantity: purchaseItem.quantity,
      unitOfMeasurement: purchaseItem.unitOfMeasurement,
      price: purchaseItem.price,
      date: purchaseItem.date,
      modifiedAt: purchaseItem.modifiedAt,
      modifiedBy: purchaseItem.modifiedBy,
    };
  }
}
