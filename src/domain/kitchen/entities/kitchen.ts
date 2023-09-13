//import { Kitchen } from "@data/kitchen/models/kitchen-model";

export class KitchenModel {
    constructor(
        public outletCode_byId:string = "",
        public kitchen_code:string = "",
        public kitchen_area:string = "",
        public kitchen_name:string = "",
        public createdBy:Date,
        public del_status: boolean
    ) {}
}

// Kitchen Entity provided by Kitchen Repository is converted to Express API Response
export class KitchenEntity{
    constructor(
        public id: string | undefined = undefined, // Set as a default value for id
        public outletCode_byId:string,
        public kitchen_code:string,
        public kitchen_area:string,
        public kitchen_name:string,
        public createdBy:Date,
        public del_status: boolean
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
            outletCode_byId:
                kitchenData.outletCode_byId !==undefined ? kitchenData.outletCode_byId : existingKitchen.outletCode_byId,
            kitchen_code:
                kitchenData.kitchen_code !==undefined ? kitchenData.kitchen_code : existingKitchen.kitchen_code,
            kitchen_area:
                kitchenData.kitchen_area !==undefined ? kitchenData.kitchen_area : existingKitchen.kitchen_area,
            kitchen_name:
                kitchenData.kitchen_name !==undefined ? kitchenData.kitchen_name : existingKitchen.kitchen_name,
            createdBy:
                kitchenData.createdBy !==undefined ? kitchenData.createdBy : existingKitchen.createdBy,
            del_status:
                kitchenData.del_status !==undefined ? kitchenData.del_status : existingKitchen.del_status,
        };
        }else {
             // If existingKitchen is not provided, create a new KitchenEntity using kitchenData
             const kitchenEntity: KitchenEntity = {
                id: includeId ? (kitchenData._id ? kitchenData._id.toString() : undefined) : kitchenData._id.toString(),
                // id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
                outletCode_byId: kitchenData.outletCode_byId,
                kitchen_code: kitchenData.kitchen_code,
                kitchen_area: kitchenData.kitchen_area,
                kitchen_name: kitchenData.kitchen_name,
                createdBy: kitchenData.createdBy,
                del_status: kitchenData.del_status,
             };
             return kitchenEntity;
        }
    }

        static toModel(kitchen: KitchenEntity): any {
            return {
                id: kitchen.id,
                // id: table.id,
                outletCode_byId: kitchen.outletCode_byId,
                kitchen_code: kitchen.kitchen_code,
                kitchen_area: kitchen.kitchen_area,
                kitchen_name: kitchen.kitchen_name,
                createdBy: kitchen.createdBy,
                del_status: kitchen.del_status, 
            };
        }
    }
