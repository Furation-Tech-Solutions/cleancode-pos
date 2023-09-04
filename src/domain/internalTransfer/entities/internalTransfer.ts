const StatusEnum = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHIPPED: "Shipped",
  DELIVERED: "Delivery",
  CANCELLED: "Cancelled",
};

export class InternalTransferModel {
  constructor(
    public sourceInventory: string = "",
    public destinationInventory: string = "",
    public deliveryAddress: string = "",
    public transferDate: Date = new Date(),
    public transferItems: string[] = [],
    public transferStatus: string = "pending",
    public description: string = ""
  ) {}
}
export class InternalTransferEntity {
  constructor(
    public id: string | undefined = undefined,
    public sourceInventory: string,
    public destinationInventory: string,
    public deliveryAddress: string,
    public transferDate: Date,
    public transferItems: string[],
    public transferStatus: string = "pending",
    public description: string = ""
  ) {}
}

export class InternalTransferMapper {
  static toEntity(
    transferData: any,
    includeId?: boolean,
    existingTransfer?: InternalTransferEntity
  ): InternalTransferEntity {
    if (existingTransfer != null) {
      // If existingTransfer is provided, merge the data from transferData with the existingTransfer
      return {
        ...existingTransfer,
        sourceInventory:
          transferData.sourceInventory || existingTransfer.sourceInventory,
        destinationInventory:
          transferData.destinationInventory ||
          existingTransfer.destinationInventory,
        deliveryAddress:
          transferData.deliveryAddress || existingTransfer.deliveryAddress,
        transferDate:
          transferData.transferDate || existingTransfer.transferDate,
        transferItems:
          transferData.transferItems || existingTransfer.transferItems,
        transferStatus:
          transferData.transferStatus || existingTransfer.transferStatus,
        description: transferData.description || existingTransfer.description,
      };
    } else {
      // If existingTransfer is not provided, create a new InternalTransferEntity using transferData
      return new InternalTransferEntity(
        includeId
          ? transferData._id
            ? transferData._id.toString()
            : undefined
          : undefined,
        transferData.sourceInventory,
        transferData.destinationInventory,
        transferData.deliveryAddress,
        transferData.transferDate,
        transferData.transferItems,
        transferData.transferStatus,
        transferData.description,
      );
    }
  }

  static toModel(transfer: InternalTransferEntity): any {
    return {
      id: transfer.id,
      sourceInventory: transfer.sourceInventory,
      destinationInventory: transfer.destinationInventory,
      deliveryAddress: transfer.deliveryAddress,
      transferDate: transfer.transferDate,
      transferItems: transfer.transferItems,
      transferStatus: transfer.transferStatus,
      description: transfer.description,
    };
  }
}
