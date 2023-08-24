//import { Kitchen } from "@data/kitchen/models/kitchen-model";

export class KitchenModel {
    constructor(
        public outlet_code:string = "",
        public kitchen_code:string = "",
        public kitchen_area:string = "",
        public kitchen_name:string = "",
        public del_status:string = ""
    ) {}
}

// Kitchen Entity provided by Kitchen Repository is converted to Express API Response
export class KitchenEntity{
    constructor(
        public id: string | undefined = undefined, // Set as a default value for id
        public outlet_code:string,
        public kitchen_code:string,
        public kitchen_area:string,
        public kitchen_name:string,
        
        public del_status:string
    ) {}
}


export class KitchenMapper {
    static toEntity(
        kitchenData: any,
        includeId?: boolean,
        existingKitchen?: KitchenEntity
    ): KitchenEntity {
        if(existingKitchen != null){
        // If existingKitchen is provided, merge the data from kitchenData with the existingKitchen
        return{
            ...existingKitchen,
            outlet_code:
            kitchenData.outlet_code !==undefined ? kitchenData.outlet_code : existingKitchen.outlet_code,
            kitchen_code:
            kitchenData.kitchen_code !==undefined ? kitchenData.kitchen_code : existingKitchen.kitchen_code,
            kitchen_area:
            kitchenData.kitchen_area !==undefined ? kitchenData.kitchen_area : existingKitchen.kitchen_area,
            kitchen_name:
            kitchenData.kitchen_name !==undefined ? kitchenData.kitchen_name : existingKitchen.kitchen_name,
            del_status:
            kitchenData.del_status !==undefined ? kitchenData.del_status : existingKitchen.del_status,
        };
        }else {
             // If existingKitchen is not provided, create a new KitchenEntity using kitchenData
             const kitchenEntity: KitchenEntity = {
                id: includeId ? (kitchenData._id ? kitchenData._id.toString() : undefined) : undefined,
                // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
                outlet_code: kitchenData.outlet_code,
                kitchen_code: kitchenData.kitchen_code,
                kitchen_area: kitchenData.kitchen_area,
                kitchen_name: kitchenData.kitchen_name,
                del_status: kitchenData.del_status,
             };
             return kitchenEntity;
        }
    }

        static toModel(kitchen: KitchenEntity): any {
            return {
                id: kitchen.id,
                // id: table.id,
                outlet_code: kitchen.outlet_code,
                kitchen_code: kitchen.kitchen_code,
                kitchen_area: kitchen.kitchen_area,
                kitchen_name: kitchen.kitchen_name,
                del_status: kitchen.del_status, 
            };
        }
    }
