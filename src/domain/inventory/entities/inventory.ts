// Express API request populate the Inventory Model
export class InventoryModel {
    constructor(
        public name: string = "",
        public place: string = "",
        public companyId: string = ""
    ) { }
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class InventoryEntity {
    constructor(
        public id: string | undefined = undefined, // Set a default value for id
        public name: string,
        public place: string,
        public companyId: string
    ) { }
}

export class InventoryMapper {
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
    }

    static toModel(inventory: InventoryEntity): any {
        return {
            id: inventory.id,
            name: inventory.name,
            place: inventory.place,
            companyId: inventory.companyId,
        };
    }
}

