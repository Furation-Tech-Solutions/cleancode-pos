// Express API request populate the Table Model
export class TableModel {
  constructor(
    public area_id: string = "",
    public outlet_id: string = "",
    public personName: string = "",
    public phone_number: string = "",
    public sit_capacity: number = 0,
    public position: string = "",
    public description: string = "",
    public del_status: boolean
  ) { }
}

// Table Entity provided by Table Repository is converted to Express API Response
export class TableEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public area_id: string,
    public outlet_id: string,
    public personName: string,
    public phone_number: string,
    public sit_capacity: number,
    public position: string,
    public description: string,
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
        outlet_id:
          tableData.outlet_id !== undefined ? tableData.outlet_id : existingTable.outlet_id,
        personName:
          tableData.personName !== undefined ? tableData.personName : existingTable.personName,
        phone_number:
          tableData.phone_number !== undefined ? tableData.phone_number : existingTable.phone_number,
        sit_capacity:
          tableData.sit_capacity !== undefined ? tableData.sit_capacity : existingTable.sit_capacity,
        position:
          tableData.position !== undefined ? tableData.position : existingTable.position,
        description:
          tableData.description !== undefined ? tableData.description : existingTable.description,
        del_status:
          tableData.del_status !== undefined ? tableData.del_status : existingTable.del_status,

      };
    } else {
      // If existingTable is not provided, create a new TableEntity using tableData
      const tableEntity: TableEntity = {
        id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
        area_id: tableData.area_id,
        outlet_id: tableData.outlet_id,
        personName: tableData.personName,
        phone_number: tableData.phone_number,
        sit_capacity: tableData.sit_capacity,
        position: tableData.position,
        description: tableData.description,
        del_status: tableData.del_status,
      };
      return tableEntity;
    }
  }

  static toModel(table: TableEntity): any {
    return {
      id: table.id,
      area_id: table.area_id,
      outlet_id: table.outlet_id,
      personName: table.personName,
      phone_number: table.phone_number,
      sit_capacity: table.sit_capacity,
      position: table.position,
      description: table.description,
      del_status: table.del_status,
    };
  }
}
