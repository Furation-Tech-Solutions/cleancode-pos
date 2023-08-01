import { type TableRepository } from "@domain/table/repositories/table-repository";

export interface DeleteTableUsecase {
  execute: (tableId: string) => Promise<void>
}

export class DeleteTable implements DeleteTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableId: string): Promise<void> {
    await this.tableRepository.deleteTable(tableId);
  }
}
