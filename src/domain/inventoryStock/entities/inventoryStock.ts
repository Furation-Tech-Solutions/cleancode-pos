export class InventorystockModel {
    constructor (
        public company_id : String="",
        public inventory_id : String="",
        public item : String="",
        public total_qtn : String="",
        public flag : String=""
    ) {}
}

export class InventorystockEntity {
    constructor (
        public id: String | undefined = undefined,
        public company_id: String="",
        public inventory_id: String="",
        public item: String="",
        public total_qtn: String="",
        public flag : String="",
        public createdAt: String
    ) {}
}

export class InventorystockMapper {
    static toEntity (
        inventorystockData: any,
        includeId?: boolean,
        existingInventorystock? : InventorystockEntity
    ) : InventorystockEntity {
        if(existingInventorystock !=null){
            return {
                ...existingInventorystock,
                company_id:
                    inventorystockData.company_id !==undefined 
                    ? inventorystockData.company_id
                    : existingInventorystock?.company_id,
                inventory_id:
                    inventorystockData.inventory_id !== undefined
                    ? inventorystockData.inventory_id
                    : existingInventorystock?.inventory_id,
                item:
                    inventorystockData.item !== undefined
                    ? inventorystockData.item
                    : existingInventorystock?.item,
                total_qtn:
                    inventorystockData.total_qtn !== undefined
                    ? inventorystockData.total_qtn
                    : existingInventorystock?.total_qtn,
                flag:
                    inventorystockData.flag !== undefined
                    ? inventorystockData.flag
                    : existingInventorystock?.flag,
                createdAt:
                    inventorystockData.createdAt !== undefined
                    ? inventorystockData.createdAt
                    : existingInventorystock?.createdAt
            }
        }else {
            const inventorystockEntity: InventorystockEntity = {
                id: includeId
                  ? inventorystockData._id
                    ? inventorystockData._id.toString()
                    : undefined
                  : undefined,
                company_id: inventorystockData.company_id,
                inventory_id: inventorystockData.inventory_id,
                item: inventorystockData.item,
                total_qtn: inventorystockData.total_qtn,
                flag: inventorystockData.flag,
                createdAt: inventorystockData.createdAt,
              };
              return inventorystockEntity;
        }
    }
    static toModel (inventorystock: InventorystockEntity): any {
        return {
          id: inventorystock.id,
          company_id: inventorystock.company_id,
          inventory_id: inventorystock.inventory_id, 
          item: inventorystock.item,
          total_qtn: inventorystock.total_qtn,
          flag: inventorystock.flag,
          createdAt: inventorystock.createdAt,
        };
      }
}