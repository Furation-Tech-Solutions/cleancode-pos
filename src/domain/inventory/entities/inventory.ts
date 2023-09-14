// Express API request DTO
export class InventoryModel {
  constructor(
    public inventoryName: string = "",
    public location: string = "",
    public description: string = "",
    public companyId: string[] = []
  ) {}
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class InventoryEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryName: string,
    public location: string,
    public description: string,
    public companyId: string[]
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
        location:
          inventoryData.location !== undefined
            ? inventoryData.location
            : existingInventory.location,
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
          : inventoryData._id.toString(),
        inventoryName: inventoryData.inventoryName,
        location: inventoryData.location,
        description: inventoryData.description,
        companyId: inventoryData.companyId,
      };
      return inventoryEntity;
    }
  }

  static toModel(inventory: InventoryEntity): any {
    return {
      inventoryName: inventory.inventoryName,
      location: inventory.location,
      description: inventory.description,
      companyId: inventory.companyId,
    };
  }
}
