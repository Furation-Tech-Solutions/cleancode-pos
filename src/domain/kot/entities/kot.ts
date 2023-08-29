
export class KotItem{
    constructor(
        public food_item:string="",
        public quantity:number=0,
        public customer_comment:string=""
    ){}
}

export class KotModel {
    constructor(
        public kot_number:string = "",
        public type_of_order:string = "",
        public waiter_name:string = "",
        public table:string="",
        public cooking_status:string = "",
        public items:KotItem[] = [],
        public customer_comment_for_all_food:string="",
        public createdAt:string="",
        public del_status:string="",

    ) {}
}

// Kitchen Entity provided by Kitchen Repository is converted to Express API Response
export class KotEntity{
    constructor(
        public id: string | undefined = undefined,   // Set as a default value for id
        public kot_number:string ,
        public type_of_order:string ,
        public waiter_name:string ,
        public table:string="",
        public cooking_status:string ,
        public items:KotItem[],
        public customer_comment_for_all_food:string,
        public createdAt:string,
        public del_status:string,
    
    ) {}
}
export class KotMapper{
    static toModel(kot:KotEntity):any{
        return {
          id:kot.id,
          kot_number:kot.kot_number,
          type_of_order:kot.type_of_order,
          waiter_name:kot.waiter_name,
          table:kot.table,
          cooking_status:kot.cooking_status,
          items:kot.items,
          customer_comment_for_all_food:kot.customer_comment_for_all_food,
          createdAt:kot.createdAt,
          del_status:kot.del_status
        }

    }
    static toEntity(
        kotData: any,
        includeId?: boolean,
        existingKot?: KotEntity
    ): KotEntity {
        if(existingKot != null){
        // If existingKitchen is provided, merge the data from kitchenData with the existingKitchen
        return{
            ...existingKot,
            kot_number:
            kotData.kot_number!==undefined?kotData.kot_number:existingKot.kot_number,
            type_of_order:
            kotData.type_of_order!=undefined?kotData.type_of_order:existingKot.type_of_order,
            waiter_name:
            kotData.waiter_name!=undefined?kotData.waiter_name:existingKot.waiter_name,
            table:
            kotData.table!=undefined?kotData.table:existingKot.table,
            cooking_status:
            kotData.cooking_status!=undefined?kotData.cooking_status:existingKot.cooking_status,
            items:
            kotData.items!=undefined?kotData.items:existingKot.items,
            customer_comment_for_all_food:
            kotData.customer_comment_for_all_food!=undefined?kotData.customer_comment_for_all_food:existingKot.customer_comment_for_all_food,
            createdAt:
            kotData.createdAt!=undefined?kotData.createdAt:existingKot.createdAt,
            del_status:
            kotData.del_status!=undefined?kotData.del_status:existingKot.del_status,
            
        };
        }else {
             // If existingKitchen is not provided, create a new KitchenEntity using kitchenData
             const kotEntity: KotEntity = {
                id: includeId ? (kotData._id ? kotData._id.toString() : undefined) : undefined,
                // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
                kot_number:kotData.kot_number,
                type_of_order:kotData.type_of_order,
                waiter_name:kotData.waiter_name,
                table:kotData.table,
                cooking_status:kotData.cooking_status,
                items:kotData.items,
                customer_comment_for_all_food:kotData.customer_comment_for_all_food,
                createdAt:kotData.createdAt,
                del_status:kotData.del_status
             };
             return kotEntity;
        }
}

        
}