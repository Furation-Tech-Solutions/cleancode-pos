
export class KotItem{
    constructor(
        public foodItem:string="",
        public quantity:number=0,
        public customerComment:string=""
    ){}
}

export class KotModel {
    constructor(
        public kotNumber:string = "",
        public typeOfOrder:string = "",
        public waiterName:string = "",
        public table:string="",
        public cookingStatus:string = "",
        public items:KotItem[] = [],
        public customerCommentForAllFood:string="",
        public createdAt:string="",
        public delStatus:string="",

    ) {}
}

// Kitchen Entity provided by Kitchen Repository is converted to Express API Response
export class KotEntity{
    constructor(
        public id: string | undefined = undefined,   // Set as a default value for id
        public kotNumber:string ,
        public typeOfOrder:string ,
        public waiterName:string ,
        public table:string="",
        public cookingStatus:string ,
        public items:KotItem[],
        public customerCommentForAllFood:string,
        public createdAt:string,
        public delStatus:string,
    
    ) {}
}
export class KotMapper{
    static toModel(kot:KotEntity):any{
        return {
          id: kot.id,
          kotNumber: kot.kotNumber,
          typeOfOrder: kot.typeOfOrder,
          waiterName: kot.waiterName,
          table: kot.table,
          cooking_status: kot.cookingStatus,
          items: kot.items,
          customerCommentForAllFood: kot.customerCommentForAllFood,
          createdAt: kot.createdAt,
          delStatus: kot.delStatus,
        };

    }
    static toEntity(
        kotData: any,
        includeId?: boolean,
        existingKot?: KotEntity
    ): KotEntity {
        if(existingKot != null){
        // If existingKitchen is provided, merge the data from kitchenData with the existingKitchen
        return {
          ...existingKot,
          kotNumber:
            kotData.kotNumber !== undefined
              ? kotData.kotNumber
              : existingKot.kotNumber,
          typeOfOrder:
            kotData.typeOfOrder != undefined
              ? kotData.typeOfOrder
              : existingKot.typeOfOrder,
          waiterName:
            kotData.waiterName != undefined
              ? kotData.waiterName
              : existingKot.waiterName,
          table: kotData.table != undefined ? kotData.table : existingKot.table,
          cookingStatus:
            kotData.cookingStatus != undefined
              ? kotData.cookingStatus
              : existingKot.cookingStatus,
          items: kotData.items != undefined ? kotData.items : existingKot.items,
          customerCommentForAllFood:
            kotData.customerCommentForAllFood != undefined
              ? kotData.customerCommentForAllFood
              : existingKot.customerCommentForAllFood,
          createdAt:
            kotData.createdAt != undefined
              ? kotData.createdAt
              : existingKot.createdAt,
          delStatus:
            kotData.delStatus != undefined
              ? kotData.delStatus
              : existingKot.delStatus,
        };
        }else {
             // If existingKitchen is not provided, create a new KitchenEntity using kitchenData
             const kotEntity: KotEntity = {
               id: includeId
                 ? kotData._id
                   ? kotData._id.toString()
                   : undefined
                 : kotData._id.toString(),
               // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
               kotNumber: kotData.kotNumber,
               typeOfOrder: kotData.type_of_order,
               waiterName: kotData.waiterName,
               table: kotData.table,
               cookingStatus: kotData.cookingStatus,
               items: kotData.items,
               customerCommentForAllFood: kotData.customerCommentForAllFood,
               createdAt: kotData.createdAt,
               delStatus: kotData.delStatus,
             };
             return kotEntity;
        }
}

        
}