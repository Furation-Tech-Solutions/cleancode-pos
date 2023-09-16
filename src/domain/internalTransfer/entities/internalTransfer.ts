
export class InternalTransferModel {
  constructor(
    public sourceInventory: string = "",
    public destinationInventory: string = "",
    public transferDate: Date = new Date(),
    public del_status: boolean
  ) {}
}
export class InternalTransferEntity {
  constructor(
    public id: string | undefined = undefined,
    public sourceInventory: string,
    public destinationInventory: string,
    public transferDate: Date,
    public del_status: boolean
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
        transferDate:
          transferData.transferDate || existingTransfer.transferDate,
        del_status:
          transferData.del_status !== undefined
            ? transferData.del_status
            : existingTransfer.del_status,
      };
    } else {
      // If existingTransfer is not provided, create a new InternalTransferEntity using transferData
      return new InternalTransferEntity(
        includeId
          ? transferData._id
            ? transferData._id.toString()
            : undefined
          : transferData._id.toString(),
        transferData.sourceInventory,
        transferData.destinationInventory,
        transferData.transferDate,
        transferData.del_status,
                

      );
    }
  }

  static toModel(transfer: InternalTransferEntity): any {
    return {
      id: transfer.id,
      sourceInventory: transfer.sourceInventory,
      destinationInventory: transfer.destinationInventory,
      transferDate: transfer.transferDate,
      del_status: transfer.del_status,
    };
  }
}
