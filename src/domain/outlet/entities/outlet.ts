export class OutletModel {
  constructor(
      public company_id:string[] = [],
      public outlet_code:string = "",
      public address:string = "",
      public ownerName:string = "",
      public gstNo:string = "",
      public outletType:string = "",
      public brandLogo:string = "",
      public phone:number = 0,
      public createdAt:Date,
      public del_status: boolean

  ) {}
}

// Admin Entity provided by Admin Repository is converted to Express API Response
export class OutletEntity{
  constructor(
      public id: string | undefined = undefined, // Set as a default value for id
      public company_id:string[],
      public outlet_code:string,
      public address:string,
      public ownerName:string,
      public gstNo:string,
      public outletType:string,
      public brandLogo:string,
      public phone:number,
      public createdAt:Date,
      public del_status: boolean

  ) {}
}


export class OutletMapper {
  static toEntity(
      outletData: any,
      includeId?: boolean,
      existingOutlet?: OutletEntity
  ): OutletEntity {
      if(existingOutlet != null){
      // If existingOutlet is provided, merge the data from outletData with the existingOutlet
      return{
          ...existingOutlet,
          company_id:
              outletData.company_id !==undefined ? outletData.company_id : existingOutlet.company_id,
          outlet_code:
              outletData.outlet_code !==undefined ? outletData.outlet_code : existingOutlet.outlet_code,
          address:
              outletData.address !==undefined ? outletData.address : existingOutlet.address,
          ownerName:
              outletData.address !==undefined ? outletData.address : existingOutlet.address,
          gstNo:
              outletData.gstNo !==undefined ? outletData.gstNo : existingOutlet.gstNo,
          outletType:
              outletData.outletType !==undefined ? outletData.outletType : existingOutlet.outletType,
          brandLogo:
              outletData.brandLogo !==undefined ? outletData.brandLogo : existingOutlet.brandLogo,
          phone:
              outletData.phone !==undefined ? outletData.phone : existingOutlet.phone,
          createdAt:
              outletData.createdAt !==undefined ? outletData.createdAt : existingOutlet.createdAt,
          del_status:
              outletData.del_status !==undefined ? outletData.del_status : existingOutlet.del_status,

      };
      }else {
           // If existingAdmin is not provided, create a new AdminEntity using adminData
           const outletEntity:OutletEntity = {
              id: includeId ? outletData._id ? outletData._id.toString() : undefined : outletData._id.toString(),
              company_id: outletData.company_id,
              outlet_code: outletData.outlet_code,
              address: outletData.address,
              ownerName: outletData.ownerName,
              gstNo: outletData.gstNo,
              outletType: outletData.outletType,
              brandLogo: outletData.brandLogo,
              phone: outletData.phone,
              createdAt: outletData.createdAt,
              del_status: outletData.del_status,
           };
           return outletEntity;
      }
      }

      static toModel(outlet:OutletEntity): any {
          return {
              id: outlet.id,
              company_id: outlet.company_id,
              outlet_code: outlet.outlet_code,
              address: outlet.address,
              ownerName: outlet.ownerName,
              gstNo: outlet.gstNo,
              outletType: outlet.outletType,
              brandLogo: outlet.brandLogo,
              phone: outlet.phone,
              createdAt: outlet.createdAt,
              del_status: outlet.del_status, 
          }
      }
  }
