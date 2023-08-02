import { TableEntity } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";

export interface GetTableByIdUsecase {
  execute: (tableId: string) => Promise<TableEntity | null>;
}

export class GetTableById implements GetTableByIdUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableId: string): Promise<TableEntity | null> {
    return await this.tableRepository.getTableById(tableId);
  }
}
