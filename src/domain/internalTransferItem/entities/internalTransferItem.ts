export class InternalTransferItemModel {
  constructor(
    public internalTransferid: string = "",
    public itemid: string = "",
    public quantity: number = 1,
    public unitOfMeasurement: string = "",
    public del_status: boolean
  ) {}
}

export class InternalTransferItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public internalTransferid: string,
    public itemid: string,
    public quantity: number,
    public unitOfMeasurement: string,
    public del_status: boolean

  ) {}
}

export class InternalTransferItemMapper {
  static toEntity(
    itemData: any,
    includeId?: boolean,
    existingItem?: InternalTransferItemEntity
  ): InternalTransferItemEntity {
    if (existingItem != null) {
      // If existingItem is provided, merge the data from itemData with the existingItem
      return {
        ...existingItem,
        internalTransferid:
          itemData.internalTransferid !== undefined
            ? itemData.internalTransferid
            : existingItem.internalTransferid,
        itemid:
          itemData.itemid !== undefined ? itemData.itemid : existingItem.itemid,
        quantity:
          itemData.quantity !== undefined
            ? itemData.quantity
            : existingItem.quantity,
        unitOfMeasurement:
          itemData.unitOfMeasurement !== undefined
            ? itemData.unitOfMeasurement
            : existingItem.unitOfMeasurement,
        del_status:
          itemData.del_status !== undefined
            ? itemData.del_status
            : existingItem.del_status,
      };
    } else {
      // If existingItem is not provided, create a new InternalTransferItemEntity using itemData
      const itemEntity: InternalTransferItemEntity = {
        id: includeId
          ? itemData._id
            ? itemData._id.toString()
            : undefined
          : itemData._id.toString(),
        itemid: itemData.itemid,
        internalTransferid: itemData.internalTransferid,
        quantity: itemData.quantity,
        unitOfMeasurement: itemData.unitOfMeasurement,
        del_status: itemData.del_status,

      };
      return itemEntity;
    }
  }

  static toModel(item: InternalTransferItemEntity): any {
    return {
      id: item.id,
      internalTransferid: item.internalTransferid,
      itemid: item.itemid,
      quantity: item.quantity,
      unitOfMeasurement: item.unitOfMeasurement,
      del_status: item.del_status,
    };
  }
}
