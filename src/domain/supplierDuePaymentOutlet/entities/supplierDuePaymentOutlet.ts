// Express API request populate the supplierDuePaymentOutlet Model
export class SupplierDuePaymentOutletModel {
  constructor(
    public date: Date,
    public supplier_id: string[] = [],
    public amount: number = 0,
    public note: string = "",
    public staff_id: string[] = [],
    public outlet_id: string[] = [],
    public paymentMethod: string = "",
    public paymentStatus: string = "",
    public del_status: boolean
  ) { }
}

// supplierDuePaymentOutlet Entity provided by supplierDuePaymentOutlet Repository is converted to Express API Response
export class SupplierDuePaymentOutletEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public date: Date,
    public supplier_id: string[],
    public amount: number,
    public note: string,
    public staff_id: string[],
    public outlet_id: string[],
    public paymentMethod: string,
    public paymentStatus: string,
    public del_status: boolean
  ) { }
}


export class SupplierDuePaymentOutletMapper {
  static toEntity(
    supplierDuePaymentOutletData: any,
    includeId?: boolean,
    existingSupplierDuePaymentOutlet?: SupplierDuePaymentOutletEntity
  ): SupplierDuePaymentOutletEntity {
    if (existingSupplierDuePaymentOutlet != null) {
      // If existingSupplierDuePaymentOutlet is provided, merge the data from supplierDuePaymentOutletData with the existingSupplierDuePaymentOutlet
      return {
        ...existingSupplierDuePaymentOutlet,
        date:
          supplierDuePaymentOutletData.date !== undefined ? supplierDuePaymentOutletData.date : existingSupplierDuePaymentOutlet.date,
        supplier_id:
          supplierDuePaymentOutletData.supplier_id !== undefined ? supplierDuePaymentOutletData.supplier_id : existingSupplierDuePaymentOutlet.supplier_id,
        amount:
          supplierDuePaymentOutletData.amount !== undefined ? supplierDuePaymentOutletData.amount : existingSupplierDuePaymentOutlet.amount,
        note:
          supplierDuePaymentOutletData.note !== undefined ? supplierDuePaymentOutletData.note : existingSupplierDuePaymentOutlet.note,
        outlet_id:
          supplierDuePaymentOutletData.outlet_id !== undefined ? supplierDuePaymentOutletData.outlet_id : existingSupplierDuePaymentOutlet.outlet_id,
        staff_id:
          supplierDuePaymentOutletData.staff_id !== undefined ? supplierDuePaymentOutletData.staff_id : existingSupplierDuePaymentOutlet.staff_id,
        paymentMethod:
          supplierDuePaymentOutletData.paymentMethod !== undefined ? supplierDuePaymentOutletData.paymentMethod : existingSupplierDuePaymentOutlet.paymentMethod,
        paymentStatus:
          supplierDuePaymentOutletData.paymentStatus !== undefined ? supplierDuePaymentOutletData.paymentStatus : existingSupplierDuePaymentOutlet.paymentStatus,
        del_status:
          supplierDuePaymentOutletData.del_status !== undefined ? supplierDuePaymentOutletData.del_status : existingSupplierDuePaymentOutlet.del_status
      };
    } else {
      // If existingSupplierDuePaymentOutlet is not provided, create a new SupplierDuePaymentOutletEntity using supplierDuePaymentOutletData
      const SupplierDuePaymentOutletEntity: SupplierDuePaymentOutletEntity = {
        id: includeId ? (supplierDuePaymentOutletData._id ? supplierDuePaymentOutletData._id.toString() : undefined) : supplierDuePaymentOutletData._id.toString(),
        date: supplierDuePaymentOutletData.date,
        supplier_id: supplierDuePaymentOutletData.supplier_id,
        amount: supplierDuePaymentOutletData.amount,
        note: supplierDuePaymentOutletData.note,
        staff_id: supplierDuePaymentOutletData.staff_id,
        outlet_id: supplierDuePaymentOutletData.outlet_id,
        paymentMethod: supplierDuePaymentOutletData.paymentMethod,
        paymentStatus: supplierDuePaymentOutletData.paymentStatus,
        del_status: supplierDuePaymentOutletData.del_status
      };
      return SupplierDuePaymentOutletEntity;
    }
  }

  static toModel(supplierDuePaymentOutlet: SupplierDuePaymentOutletEntity): any {
    return {
      id: supplierDuePaymentOutlet.id,
      date: supplierDuePaymentOutlet.date,
      supplier_id: supplierDuePaymentOutlet.supplier_id,
      amount: supplierDuePaymentOutlet.amount,
      note: supplierDuePaymentOutlet.note,
      staff_id: supplierDuePaymentOutlet.staff_id,
      outlet_id: supplierDuePaymentOutlet.outlet_id,
      paymentMethod: supplierDuePaymentOutlet.paymentMethod,
      paymentStatus: supplierDuePaymentOutlet.paymentStatus,
      del_status: supplierDuePaymentOutlet.del_status
    };
  }
}
