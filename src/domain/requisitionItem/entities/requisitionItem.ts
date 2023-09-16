export class RequisitionItemModel {
  constructor(
    public requisitionid: string = "",
    public itemid: string = "",
    public quantity: number = 1,
    public unitOfMeasurement: string = "",
    public del_status: boolean
  ) {}
}

export class RequisitionItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public requisitionid: string,
    public itemid: string,
    public quantity: number,
    public unitOfMeasurement: string,
    public del_status: boolean
  ) {}
}

export class RequisitionItemMapper {
  static toEntity(
    itemData: any,
    includeId?: boolean,
    existingItem?: RequisitionItemEntity
  ): RequisitionItemEntity {
    if (existingItem != null) {
      // If existingItem is provided, merge the data from itemData with the existingItem
      return {
        ...existingItem,
        requisitionid:
          itemData.requisitionid !== undefined
            ? itemData.requisitionid
            : existingItem.requisitionid,
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
      // If existingItem is not provided, create a new RequisitionItemEntity using itemData
      const itemEntity: RequisitionItemEntity = {
        id: includeId
          ? itemData._id
            ? itemData._id.toString()
            : undefined
          : itemData._id.toString(),
        requisitionid: itemData.requisitionid,
        itemid: itemData.itemid,
        quantity: itemData.quantity,
        unitOfMeasurement: itemData.unitOfMeasurement,
        del_status: itemData.del_status,
      };
      return itemEntity;
    }
  }

  static toModel(item: RequisitionItemEntity): any {
    return {
      id: item.id,
      requisitionid: item.requisitionid,
      itemid: item.itemid,
      quantity: item.quantity,
      unitOfMeasurement: item.unitOfMeasurement,
      del_status: item.del_status,
    };
  }
}
