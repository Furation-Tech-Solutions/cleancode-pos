import { TableEntity, TableModel } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";

export interface CreateTableUsecase {
  execute: (tableData: TableModel) => Promise<TableEntity>;
}

export class CreateTable implements CreateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableData: TableModel): Promise<TableEntity> {
    return await this.tableRepository.createTable(tableData);
  }
}
