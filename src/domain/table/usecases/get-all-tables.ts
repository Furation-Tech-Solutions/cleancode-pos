import { TableEntity } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllTablesUsecase {
  execute: () => Promise<Either<ErrorClass, TableEntity[]>>;
}

export class GetAllTables implements GetAllTablesUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(): Promise<Either<ErrorClass, TableEntity[]>> {
    return await this.tableRepository.getTables();
  }
}
