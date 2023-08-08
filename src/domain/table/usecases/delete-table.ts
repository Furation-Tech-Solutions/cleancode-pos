import { type TableRepository } from "../repositories/table-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteTableUsecase {
  execute: (tableId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteTable implements DeleteTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableId: string): Promise<Either<ErrorClass, void>> {
   return await this.tableRepository.deleteTable(tableId);
  }
}
