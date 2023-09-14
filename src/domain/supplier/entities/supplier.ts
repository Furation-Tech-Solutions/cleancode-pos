// Express API request populate the supplier Model
export class SupplierModel {
  constructor(
    public companyId: string[] = [],
    public contact: number = 0,
    public address: string = "",
    public email: string = "",
    public del_status: boolean
  ) {}
}

// supplier Entity provided by supplier Repository is converted to Express API Response
export class SupplierEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public companyId: string[],
    public contact: number,
    public address: string,
    public email: string,
    public del_status: boolean
  ) { }
}


export class SupplierMapper {
  static toEntity(
    supplierData: any,
    includeId?: boolean,
    existingSupplier?: SupplierEntity
  ): SupplierEntity {
    if (existingSupplier != null) {
      // If existingSupplier is provided, merge the data from supplierData with the existingSupplier
      return {
        ...existingSupplier,
        companyId: supplierData.outletid || existingSupplier.companyId,
        contact: supplierData.contact || existingSupplier.contact,
        address: supplierData.address || existingSupplier.address,
        email: supplierData.email || existingSupplier.email,
        del_status: supplierData.del_status || existingSupplier.del_status,
      };
    } else {
      // If existingSupplier is not provided, create a new SupplierEntity using supplierData
      const SupplierEntity: SupplierEntity = {
        id: includeId ? (supplierData._id ? supplierData._id.toString() : undefined) : supplierData._id.toString(),
        companyId: supplierData.companyId,
        contact: supplierData.contact,
        address: supplierData.address,
        email: supplierData.email,
        del_status: supplierData.del_status,
      };
      return SupplierEntity;
    }
  }

  static toModel(supplier: SupplierEntity): any {
    return {
      id: supplier.id,
      companyId: supplier.companyId,
      contact: supplier.contact,
      address: supplier.address,
      email: supplier.email,
      del_status: supplier.del_status
    };
  }
}
