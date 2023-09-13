// Express API request DTO
export class InventoryModel {
  constructor(
    public inventoryName: string = "",
    public location: string = "",
    public description: string = "",
    public companyId: string = ""
  ) {}
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class InventoryEntity {
  constructor(
    public id: string | undefined = undefined,
    public inventoryName: string,
    public location: string,
    public description: string,
    public companyId: string
  ) {}
}

export class InventoryMapper {
<<<<<<< HEAD
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
=======
    static toEntity(
        inventoryData: any,
        includeId?: boolean,
        existingInventory?: InventoryEntity,
    ): InventoryEntity {
        if (existingInventory != null) {
            // If existingAdmin is provided, merge the data from adminData with the existingAdmin
            return {
                ...existingInventory,
                name:
                    inventoryData.name !== undefined ? inventoryData.name : existingInventory.name,
                place:
                    inventoryData.place !== undefined ? inventoryData.place : existingInventory.place,
                companyId:
                    inventoryData.companyId !== undefined
                        ? inventoryData.companyId
                        : existingInventory.companyId,
            };
        } else {
            // If existingAdmin is not provided, create a new AdminEntity using adminData
            const inventoryEntity: InventoryEntity = {
                id: includeId ? (inventoryData._id ? inventoryData._id.toString() : undefined) : inventoryData._id.toString(),
                name: inventoryData.name,
                place: inventoryData.place,
                companyId: inventoryData.companyId,
            };
            return inventoryEntity;
        }
>>>>>>> 26c0958bbe883633ef81c92c4e71d0ed9a3ac8b4
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
