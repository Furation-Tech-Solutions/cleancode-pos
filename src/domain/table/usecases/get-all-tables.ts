import { TableEntity } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";

export interface GetAllTablesUsecase {
  execute: () => Promise<TableEntity[]>;
}

export class GetAllTables implements GetAllTablesUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(): Promise<TableEntity[]> {
    return await this.tableRepository.getTables();
  }
}
