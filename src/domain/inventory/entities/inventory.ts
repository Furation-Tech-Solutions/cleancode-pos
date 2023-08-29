// Express API request DTO
export class InventoryModel {
  constructor(
    public inventoryName: string = "",
    public address: string = "",
    public storingCapacity: string = "",
    public gstNo: string = "",
    public description: string = "",
    public companyId: string = ""
  ) {}
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class InventoryEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryName: string,
    public address: string,
    public storingCapacity: string,
    public gstNo: string,
    public description: string,
    public companyId: string
  ) {}
}

export class InventoryMapper {
  static toEntity(
    inventoryData: any,
    includeId?: boolean,
    existingInventory?: InventoryEntity
  ): InventoryEntity {
    if (existingInventory != null) {
      // If existingInventory is provided, merge the data from inventoryData with the existingInventory
      return {
        ...existingInventory,
        inventoryName:
          inventoryData.inventoryName !== undefined
            ? inventoryData.inventoryName
            : existingInventory.inventoryName,
        address:
          inventoryData.address !== undefined
            ? inventoryData.address
            : existingInventory.address,
        storingCapacity:
          inventoryData.storingCapacity !== undefined
            ? inventoryData.storingCapacity
            : existingInventory.storingCapacity,
        gstNo:
          inventoryData.gstNo !== undefined
            ? inventoryData.gstNo
            : existingInventory.gstNo,
        description:
          inventoryData.description !== undefined
            ? inventoryData.description
            : existingInventory.description,
        companyId:
          inventoryData.companyId !== undefined
            ? inventoryData.companyId
            : existingInventory.companyId,
      };
    } else {
      // If existingInventory is not provided, create a new InventoryEntity using inventoryData
      const inventoryEntity: InventoryEntity = {
        id: includeId
          ? inventoryData._id
            ? inventoryData._id.toString()
            : undefined
          : undefined,
        inventoryName: inventoryData.inventoryName,
        address: inventoryData.address,
        storingCapacity: inventoryData.storingCapacity,
        gstNo: inventoryData.gstNo,
        description: inventoryData.description,
        companyId: inventoryData.companyId,
      };
      return inventoryEntity;
    }
  }

  static toModel(inventory: InventoryEntity): any {
    return {
      id: inventory.id,
      inventoryName: inventory.inventoryName,
      address: inventory.address,
      storingCapacity: inventory.storingCapacity,
      gstNo: inventory.gstNo,
      description: inventory.description,
      companyId: inventory.companyId,
    };
  }
}
