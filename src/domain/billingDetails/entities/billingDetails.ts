// Express API request populate the BillingDetails Model
export class BillingDetailsModel {
  constructor(
    public orderNunber_byId: string = "",
    public billNumber: string = "",
    public Dine_price: number = 0,
    public dateTime: Date,
    public particulars: particularsModelItem[] = [],
    public subTotal: number = 0,
    public CGST: number = 0,
    public SGST: number = 0,
    public finalTotal: number = 0,
    public gstNo: string = "",
    public del_status: boolean
  ) { }
}

export class particularsModelItem {
  constructor(
    public foodMenu: string = "",
    public quantity: number = 0,
    public rate: number = 0,
    public amount: number = 0
  ) {}
}

// BillingDetails Entity provided by BillingDetails Repository is converted to Express API Response
export class BillingDetailsEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public orderNunber_byId: string,
    public billNumber: string,
    public Dine_price: number,
    public dateTime: Date,
    public particulars: particularsModelItem[],
    public subTotal: number,
    public CGST: number,
    public SGST: number,
    public finalTotal: number,
    public gstNo: string,
    public del_status: boolean
  ) { }
}

export class FoodMenuEntityItem {
  constructor(
    public foodMenu: string,
    public quantity: number,
    public rate: number,
    public amount: number
  ) {}
}


export class BillingDetailsMapper {
  static toEntity(
    billingDetailsData: any,
    includeId?: boolean,
    existingBillingDetails?: BillingDetailsEntity
  ): BillingDetailsEntity {
    if (existingBillingDetails != null) {
      // If existingBillingDetails is provided, merge the data from billingDetailsData with the existingBillingDetails
      return {
        ...existingBillingDetails,
        orderNunber_byId:
          billingDetailsData.orderNunber_byId !== undefined 
            ? billingDetailsData.orderNunber_byId 
            : existingBillingDetails.orderNunber_byId,
        billNumber:
          billingDetailsData.billNumber !== undefined 
            ? billingDetailsData.billNumber 
            : existingBillingDetails.billNumber,
        Dine_price:
          billingDetailsData.Dine_price !== undefined 
            ? billingDetailsData.Dine_price 
            : existingBillingDetails.Dine_price,
        dateTime:
          billingDetailsData.dateTime !== undefined 
            ? billingDetailsData.dateTime 
            : existingBillingDetails.dateTime,
        particulars:
            billingDetailsData.particulars !== undefined
              ? billingDetailsData.particulars.food_item
              : existingBillingDetails.particulars,
        subTotal:
          billingDetailsData.subTotal !== undefined 
            ? billingDetailsData.subTotal 
            : existingBillingDetails.subTotal,
        CGST:
          billingDetailsData.CGST !== undefined 
            ? billingDetailsData.CGST 
            : existingBillingDetails.CGST,
        SGST:
            billingDetailsData.SGST !== undefined
              ? billingDetailsData.SGST.deliveryPartnerName
              : existingBillingDetails.SGST,
        finalTotal:
          billingDetailsData.finalTotal !== undefined 
            ? billingDetailsData.finalTotal 
            : existingBillingDetails.finalTotal,
        gstNo:
          billingDetailsData.gstNo !== undefined 
            ? billingDetailsData.gstNo 
            : existingBillingDetails.gstNo,
        del_status:
          billingDetailsData.del_status !== undefined 
            ? billingDetailsData.del_status 
            : existingBillingDetails.del_status
      };
    } else {
      // If existingBillingDetails is not provided, create a new BillingDetailsEntity using BillingDetailsData
      const BillingDetailsEntity: BillingDetailsEntity = {
        id: includeId ? (billingDetailsData._id ? billingDetailsData._id.toString() : undefined) : billingDetailsData._id.toString(),
        orderNunber_byId: billingDetailsData.orderNunber_byId,
        billNumber: billingDetailsData.billNumber,
        Dine_price: billingDetailsData.Dine_price,
        dateTime: billingDetailsData.dateTime,
        particulars: billingDetailsData.particulars,
        subTotal: billingDetailsData.subTotal,
        CGST: billingDetailsData.CGST,
        SGST: billingDetailsData.SGST,
        finalTotal: billingDetailsData.finalTotal,
        gstNo: billingDetailsData.gstNo,
        del_status: billingDetailsData.del_status
      };
      return BillingDetailsEntity;
    }
  }

  static toModel(billingDetails: BillingDetailsEntity): any {
    return {
      id: billingDetails.id,
      orderNunber_byId: billingDetails.orderNunber_byId,
      billNumber: billingDetails.billNumber,
      Dine_price: billingDetails.Dine_price,
      dateTime: billingDetails.dateTime,
      particulars: billingDetails.particulars,
      subTotal: billingDetails.subTotal,
      CGST: billingDetails.CGST,
      SGST: billingDetails.SGST,
      finalTotal: billingDetails.finalTotal,
      gstNo: billingDetails.gstNo,
      del_status: billingDetails.del_status
    };
  }
}
