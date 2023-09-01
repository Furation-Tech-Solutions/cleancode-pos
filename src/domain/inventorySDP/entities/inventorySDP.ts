export class InventorySDPModel {
  constructor(
    public date: Date | string = new Date(),
    public supplier: string = "",
    public paymentMethod: string = "",
    public amount: number = 0,
    public note: string = "",
    public addedBy: string = ""
  ) {}
}

export class InventorySDPEntity {
  constructor(
    public id: string | undefined = undefined,
    public date: Date | string,
    public supplier: string,
    public paymentMethod: string,
    public amount: number,
    public note: string,
    public addedBy: string
  ) {}
}

export class InventorySDPMapper {
  static toEntity(
    inventorySDPData: any,
    includeId?: boolean,
    existingInventorySDP?: InventorySDPEntity
  ): InventorySDPEntity {
    if (existingInventorySDP != null) {
      // If existingInventorySDP is provided, merge the data from inventorySDPData with the existingInventorySDP
      return {
        ...existingInventorySDP,
        date:
          inventorySDPData.date !== undefined
            ? inventorySDPData.date
            : existingInventorySDP.date,
        supplier:
          inventorySDPData.supplier !== undefined
            ? inventorySDPData.supplier
            : existingInventorySDP.supplier,
        paymentMethod:
          inventorySDPData.paymentMethod !== undefined
            ? inventorySDPData.paymentMethod
            : existingInventorySDP.paymentMethod,
        amount:
          inventorySDPData.amount !== undefined
            ? inventorySDPData.amount
            : existingInventorySDP.amount,
        note:
          inventorySDPData.note !== undefined
            ? inventorySDPData.note
            : existingInventorySDP.note,
        addedBy:
          inventorySDPData.addedBy !== undefined
            ? inventorySDPData.addedBy
            : existingInventorySDP.addedBy,
      };
    } else {
      // If existingInventorySDP is not provided, create a new InventorySDPEntity using inventorySDPData
      const inventorySDPEntity: InventorySDPEntity = {
        id: includeId
          ? inventorySDPData._id
            ? inventorySDPData._id.toString()
            : undefined
          : undefined,
        date: inventorySDPData.date,
        supplier: inventorySDPData.supplier,
        paymentMethod: inventorySDPData.paymentMethod,
        amount: inventorySDPData.amount,
        note: inventorySDPData.note,
        addedBy: inventorySDPData.addedBy,
      };
      return inventorySDPEntity;
    }
  }

  static toModel(inventorySDP: InventorySDPEntity): any {
    return {
      id: inventorySDP.id,
      date: inventorySDP.date,
      supplier: inventorySDP.supplier,
      paymentMethod: inventorySDP.paymentMethod,
      amount: inventorySDP.amount,
      note: inventorySDP.note,
      addedBy: inventorySDP.addedBy,
    };
  }
}
