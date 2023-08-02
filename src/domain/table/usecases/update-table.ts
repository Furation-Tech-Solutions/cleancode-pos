import { TableEntity, TableModel } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";

export interface UpdateTableUsecase {
  execute: (
    tableId: string,
    tableData: Partial<TableModel>
  ) => Promise<TableEntity>;
}

export class UpdateTable implements UpdateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  // async execute(tableId: string, tableData: TableModel): Promise<TableEntity> {
  //   return await this.tableRepository.updateTable(tableId, tableData);
  // }
  // UpdateTableUsecase
  async execute(
    tableId: string,
    tableData: Partial<TableModel>
  ): Promise<TableEntity> {
    const existingTable: TableEntity | null =
      await this.tableRepository.getTableById(tableId);

    if (!existingTable) {
      throw new Error("Table not found.");
    }

    // Perform the partial update by merging tableData with existingTable
    const updatedTableData: TableModel = {
      ...existingTable,
      ...tableData,
    };

    // Save the updatedTableData to the repository
    await this.tableRepository.updateTable(tableId, updatedTableData);

    // Fetch the updated table entity from the repository
    const updatedTableEntity: TableEntity | null =
      await this.tableRepository.getTableById(tableId);

    if (!updatedTableEntity) {
      throw new Error("Table not found after update.");
    }

    return updatedTableEntity;
  }
}
