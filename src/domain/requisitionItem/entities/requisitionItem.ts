export class RequisitionItemModel {
  constructor(
    public itemName: string = "",
    public quantity: number = 1,
    public unitOfMeasurement: string = ""
  ) {}
}

export class RequisitionItemEntity {
  constructor(
    public id: string | undefined = undefined,
    public itemName: string,
    public quantity: number,
    public unitOfMeasurement: string
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
        itemName:
          itemData.itemName !== undefined
            ? itemData.itemName
            : existingItem.itemName,
        quantity:
          itemData.quantity !== undefined
            ? itemData.quantity
            : existingItem.quantity,
        unitOfMeasurement:
          itemData.unitOfMeasurement !== undefined
            ? itemData.unitOfMeasurement
            : existingItem.unitOfMeasurement,
      };
    } else {
      // If existingItem is not provided, create a new RequisitionItemEntity using itemData
      const itemEntity: RequisitionItemEntity = {
        id: includeId
          ? itemData._id
            ? itemData._id.toString()
            : undefined
          : undefined,
        itemName: itemData.itemName,
        quantity: itemData.quantity,
        unitOfMeasurement: itemData.unitOfMeasurement,
      };
      return itemEntity;
    }
  }

  static toModel(item: RequisitionItemEntity): any {
    return {
      id: item.id,
      itemName: item.itemName,
      quantity: item.quantity,
      unitOfMeasurement: item.unitOfMeasurement,
    };
  }
}
