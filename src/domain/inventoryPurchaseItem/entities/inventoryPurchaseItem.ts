export class InventoryPurchaseItemModel {
    constructor (
        public inventorypurchase_id : String = "",
        public item : String = "",
        public qtn : String = "",
        public price : String = ""
    ) {}
}

export class InventoryPurchaseItemEntity {
    constructor(
        public id: String | undefined=undefined,
        public inventorypurchase_id: String="",
        public item: String="",
        public qtn: String="",
        public price: String="",
        public createdAt: String="",
    ){}
}

export class InventoryPurchaseItemMapper {
    static toEntity(
        inventoryPurchaseItemData: any,
        includeId?: boolean,
        existingInventoryPurchaseItem?: InventoryPurchaseItemEntity
      ): InventoryPurchaseItemEntity {
        if (existingInventoryPurchaseItem != null) {
          return {
            ...existingInventoryPurchaseItem,
            inventorypurchase_id:
                inventoryPurchaseItemData.inventorypurchase_id !== undefined
                ? inventoryPurchaseItemData.inventorypurchase_id
                : existingInventoryPurchaseItem.inventorypurchase_id,
            item:
                inventoryPurchaseItemData.item !== undefined
                ? inventoryPurchaseItemData.item
                : existingInventoryPurchaseItem.item,
            qtn:
                inventoryPurchaseItemData.qtn !== undefined
                ? inventoryPurchaseItemData.qtn
                : existingInventoryPurchaseItem.qtn,
            price:
                inventoryPurchaseItemData.price !== undefined
                ? inventoryPurchaseItemData.price
                : existingInventoryPurchaseItem.price,
            createdAt:
                inventoryPurchaseItemData.createdAt !== undefined
                ? inventoryPurchaseItemData.createdAt
                : existingInventoryPurchaseItem.createdAt,
          };
        } else {
          const inventoryPurchaseItemEntity: InventoryPurchaseItemEntity = {
            id: includeId
              ? inventoryPurchaseItemData._id
                ? inventoryPurchaseItemData._id.toString()
                : undefined
              : undefined,
            inventorypurchase_id: inventoryPurchaseItemData.name,
            item: inventoryPurchaseItemData.phone,
            qtn: inventoryPurchaseItemData.address,
            price: inventoryPurchaseItemData.address,
            createdAt: inventoryPurchaseItemData.createdAt,
          };
          return inventoryPurchaseItemEntity;
        }
      }
    static toModel(inventoryPurchaseItem: InventoryPurchaseItemEntity): any {
        return {
          id: inventoryPurchaseItem.id,
          inventorypurchase_id: inventoryPurchaseItem.inventorypurchase_id,
          item: inventoryPurchaseItem.item,
          qtn: inventoryPurchaseItem.qtn,
          price: inventoryPurchaseItem.price,
          createdAt: inventoryPurchaseItem.createdAt,
        };
      }
}