// Express API request populate the Table Model
export class TableModel {
  constructor(
    public area_id: string[] = [],
    public outletCode_byId: string[] = [],
    public tableNumber: number = 0,
    public seatingCapacity: number = 0,
    public description: string = "",
    public phone_number: number = 0,
    public del_status: boolean
  ) { }
}

// Table Entity provided by Table Repository is converted to Express API Response
export class TableEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public area_id: string[],
    public outletCode_byId: string[],
    public tableNumber: number,
    public seatingCapacity: number,
    public description: string,
    public phone_number: number,
    public del_status: boolean
  ) { }
}



export class TableMapper {
  static toEntity( // (function method)
    tableData: any,
    includeId?: boolean,
    existingTable?: TableEntity
  ): TableEntity {
    if (existingTable != null) {
      // If existingTable is provided, merge the data from tableData with the existingTable
      return {
        ...existingTable,
        area_id:
          tableData.area_id !== undefined ? tableData.area_id : existingTable.area_id,
        outletCode_byId:
          tableData.outletCode_byId !== undefined ? tableData.outletCode_byId : existingTable.outletCode_byId,
        tableNumber:
          tableData.tableNumber !== undefined ? tableData.tableNumber : existingTable.tableNumber,
        seatingCapacity:
          tableData.seatingCapacity !== undefined ? tableData.seatingCapacity : existingTable.seatingCapacity,
        description:
          tableData.description !== undefined ? tableData.description : existingTable.description,
        phone_number:
          tableData.phone_number !== undefined ? tableData.phone_number : existingTable.phone_number,
        del_status:
          tableData.del_status !== undefined ? tableData.del_status : existingTable.del_status,

      };
    } else {
      // If existingTable is not provided, create a new TableEntity using tableData
      const tableEntity: TableEntity = {
        id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : tableData._id.toString(),
        area_id: tableData.area_id,
        outletCode_byId: tableData.outletCode_byId,
        tableNumber: tableData.tableNumber,
        seatingCapacity: tableData.seatingCapacity,
        description: tableData.description,
        phone_number: tableData.phone_number,
        del_status: tableData.del_status,
      };
      return tableEntity;
    }
  }

  static toModel(table: TableEntity): any {
    return {
      id: table.id,
      area_id: table.area_id,
      outletCode_byId: table.outletCode_byId,
      tableNumber: table.tableNumber,
      seatingCapacity: table.seatingCapacity,
      description: table.description,
      phone_number: table.phone_number,
      del_status: table.del_status,
    };
  }
}
