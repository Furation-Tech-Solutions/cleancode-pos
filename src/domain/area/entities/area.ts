// Express API request populate the Area Model
import { Date } from "mongoose";
export class AreaModel {
    constructor(
      public outletCode_byId: string[] = [],
      public area_name: string = "",
      public description: string = "",
      public createdAt: Date,
      public phone: number = 0,
      public del_status: boolean

    ) {}
  }
  
  // Area Entity provided by Area Repository is converted to Express API Response
  export class AreaEntity {
    constructor( 
      public id: string | undefined = undefined, // Set a default value for id
      public outletCode_byId: string[],
      public area_name: string ,
      public description: string ,
      public createdAt: Date,
      public phone: number, // Changed the type to string as phone numbers can contain characters like '+', '-', etc.
      public del_status: boolean

      ) {}
  }
  
  
  export class AreaMapper {
    static toEntity(
        areaData: any,
      includeId?: boolean,
      existingArea?: AreaEntity
    ): AreaEntity {
      if (existingArea != null) {
        // If existingArea is provided, merge the data from areaData with the existingArea
        return {
          ...existingArea,
          outletCode_byId:
            areaData.outletCode_byId !==undefined ? areaData.outletCode_byId : existingArea.outletCode_byId,
          area_name:
            areaData.area_name !== undefined? areaData.area_name : existingArea.area_name,
          description:
            areaData.description !==undefined ? areaData.description : existingArea.description,
          createdAt:
            areaData.createdAt !== undefined? areaData.createdAt: existingArea.createdAt,
          phone:
            areaData.phone !== undefined ? areaData.phone: existingArea.phone,
          del_status:
            areaData.del_status !==undefined ? areaData.del_status : existingArea.del_status,
        };
      } else {
        // If existingArea is not provided, create a new areaEntity using areaData
        const areaEntity: AreaEntity = {
            id: includeId ? (areaData._id ? areaData._id.toString() : undefined) : areaData._id.toString(),
            outletCode_byId: areaData.outletCode_byId,
            area_name: areaData.area_name,
            description: areaData.description,
            createdAt: areaData.createdAt,
            phone: areaData.phone,
            del_status: areaData.del_status,
        };
        return areaEntity;
      }
    }
    static toModel(area: AreaEntity): any {
      return {
        id: area.id,
        outletCode_byId: area.outletCode_byId,
        area_name: area.area_name,
        description: area.description,
        createdAt: area.createdAt,
        phone: area.phone,
        del_status: area.del_status, 
      };
    }
  }
  