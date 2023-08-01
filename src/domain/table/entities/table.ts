// Express API request populate the Table Model
export class TableModel {
    constructor(
      public personName: string = "",
      public sit_capacity: string = "",
      public position: string = "",
      public description: string = "",
      public table: boolean = true
      // public del_status: string = ""
    ) {}
  }
  
  // Table Entity provided by Table Repository is converted to Express API Response
  export class TableEntity {
    constructor(
      public id: string | undefined = undefined, // Set a default value for id
      public personName: string,
      public sit_capacity: string,
      public position: string,
      public description: string,
      public table: boolean
      // public del_status: String
    ) {}
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
          personName:
            tableData.personName !== undefined ? tableData.personName : existingTable.personName,
          sit_capacity:
            tableData.sit_capacity !== undefined ? tableData.sit_capacity : existingTable.sit_capacity,
          position:
            tableData.position !== undefined ? tableData.position : existingTable.position,
          description:
            tableData.description !== undefined ? tableData.description : existingTable.description,
          table:
            tableData.table !== undefined ? tableData.table : existingTable.table
          // del_status:
          //     tableData.del_status !== undefined ? tableData.del_status : existingTable.del_status,  
        };
      } else {
        // If existingTable is not provided, create a new TableEntity using tableData
        const tableEntity: TableEntity = {
          id: includeId ? (tableData._id ? tableData._id.toString() : undefined) : undefined,
          personName: tableData.personName,
          sit_capacity: tableData.sit_capacity,
          position: tableData.position,
          description: tableData.description,
          table: tableData.table
          // del_status: tableData.del_status,
        };
        return tableEntity;
      }
    }
  
    static toModel(table: TableEntity): any {
      return {
        id: table.id,
        personName: table.personName,
        sit_capacity: table.sit_capacity,
        position: table.position,
        description: table.description,
        table: table.table
        // del_status: table.del_status
      };
    }
  }
  