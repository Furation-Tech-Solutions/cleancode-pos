// Express API request DTO
export class PurchaseModel {
  constructor(
    public inventoryItemId: string = "",
    public addedBy: string = "",
    public supplierId: string = "",
    public date: string = "" ,
    public purchaseItem: string = "",
    public totalAmount: number = 0,
    public paymentMode: string = "",
    public paymentStatus: string = ""
  ) {}
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class PurchaseEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryItemId: string,
    public addedBy: string,
    public supplierId: string,
    public date: string,
    public purchaseItem: string,
    public totalAmount: number,
    public paymentMode: string,
    public paymentStatus: string
  ) {}
}

export class PurchaseMapper {
  static toEntity(
    purchaseData: any,
    includeId?: boolean,
    existingPurchase?: PurchaseEntity
  ): PurchaseEntity {
    if (existingPurchase != null) {
      // If existingPurchase is provided, merge the data from purchaseData with the existingPurchase
      return {
        ...existingPurchase,
        inventoryItemId:
          purchaseData.inventoryItemId !== undefined
            ? purchaseData.inventoryItemId
            : existingPurchase.inventoryItemId,
        addedBy:
          purchaseData.addedBy !== undefined
            ? purchaseData.addedBy
            : existingPurchase.addedBy,
        supplierId:
          purchaseData.supplierId !== undefined
            ? purchaseData.supplierId
            : existingPurchase.supplierId,
        date:
          purchaseData.date !== undefined
            ? purchaseData.date
            : existingPurchase.date,
        purchaseItem:
          purchaseData.purchaseItem !== undefined
            ? purchaseData.purchaseItem
            : existingPurchase.purchaseItem,
        totalAmount:
          purchaseData.totalAmount !== undefined
            ? purchaseData.totalAmount
            : existingPurchase.totalAmount,
        paymentMode:
          purchaseData.paymentMode !== undefined
            ? purchaseData.paymentMode
            : existingPurchase.paymentMode,
        paymentStatus:
          purchaseData.paymentStatus !== undefined
            ? purchaseData.paymentStatus
            : existingPurchase.paymentStatus,
      };
    } else {
      // If existingPurchase is not provided, create a new PurchaseEntity using purchaseData
      const purchaseEntity: PurchaseEntity = {
        id: includeId
          ? purchaseData._id
            ? purchaseData._id.toString()
            : undefined
          : undefined,
        inventoryItemId: purchaseData.inventoryItemId,
        addedBy: purchaseData.addedBy,
        supplierId: purchaseData.supplierId,
        date: purchaseData.date,
        purchaseItem: purchaseData.purchaseItem,
        totalAmount: purchaseData.totalAmount,
        paymentMode: purchaseData.paymentMode,
        paymentStatus: purchaseData.paymentStatus,
      };
      return purchaseEntity;
    }
  }

  static toModel(purchase: PurchaseEntity): PurchaseModel {
    return {
      inventoryItemId: purchase.inventoryItemId,
      addedBy: purchase.addedBy,
      supplierId: purchase.supplierId,
      date: purchase.date,
      purchaseItem: purchase.purchaseItem,
      totalAmount: purchase.totalAmount,
      paymentMode: purchase.paymentMode,
      paymentStatus: purchase.paymentStatus,
    };
  }
}
