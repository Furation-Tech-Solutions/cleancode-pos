// Express API request DTO
export class PurchaseModel {
  constructor(
    public inventoryId: string = "",
    public supplierId: string = "",
    public paymentMode: string = "",
    public grandTotal: number = 0,
    public amountDue: number = 0,
    public amountPaid: number = 0,
    public invoiceNumber: string = "",
    public date: string = ""
  ) {}
}

// Purchase Entity provided by Purchase Repository is converted to Express API Response
export class PurchaseEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryId: string,
    public supplierId: string,
    public paymentMode: string,
    public grandTotal: number,
    public amountDue: number,
    public amountPaid: number,
    public invoiceNumber: string,
    public date: string
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
        inventoryId:
          purchaseData.inventoryId !== undefined
            ? purchaseData.inventoryId
            : existingPurchase.inventoryId,
        supplierId:
          purchaseData.supplierId !== undefined
            ? purchaseData.supplierId
            : existingPurchase.supplierId,
        paymentMode:
          purchaseData.paymentMode !== undefined
            ? purchaseData.paymentMode
            : existingPurchase.paymentMode,
        grandTotal:
          purchaseData.grandTotal !== undefined
            ? purchaseData.grandTotal
            : existingPurchase.grandTotal,
        amountDue:
          purchaseData.amountDue !== undefined
            ? purchaseData.amountDue
            : existingPurchase.amountDue,
        amountPaid:
          purchaseData.amountPaid !== undefined
            ? purchaseData.amountPaid
            : existingPurchase.amountPaid,
        invoiceNumber:
          purchaseData.invoiceNumber !== undefined
            ? purchaseData.invoiceNumber
            : existingPurchase.invoiceNumber,
        date:
          purchaseData.date !== undefined
            ? purchaseData.date
            : existingPurchase.date,
      };
    } else {
      // If existingPurchase is not provided, create a new PurchaseEntity using purchaseData
      const purchaseEntity: PurchaseEntity = {
        id: includeId
          ? purchaseData._id
            ? purchaseData._id.toString()
            : undefined
          : purchaseData._id.toString(),
        inventoryId: purchaseData.inventoryId,
        supplierId: purchaseData.supplierId,
        paymentMode: purchaseData.paymentMode,
        grandTotal: purchaseData.grandTotal,
        amountDue: purchaseData.amountDue,
        amountPaid: purchaseData.amountPaid,
        invoiceNumber: purchaseData.invoiceNumber,
        date: purchaseData.date,
      };
      return purchaseEntity;
    }
  }

  static toModel(purchase: PurchaseEntity): PurchaseModel {
    return {
      inventoryId: purchase.inventoryId,
      supplierId: purchase.supplierId,
      paymentMode: purchase.paymentMode,
      grandTotal: purchase.grandTotal,
      amountDue: purchase.amountDue,
      amountPaid: purchase.amountPaid,
      invoiceNumber: purchase.invoiceNumber,
      date: purchase.date,
    };
  }
}
