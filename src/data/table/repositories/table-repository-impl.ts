import { TableModel, TableEntity } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { TableDataSource } from "../datasources/table-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class TableRepositoryImpl implements TableRepository {
  private readonly dataSource: TableDataSource;

  constructor(dataSource: TableDataSource) {
    this.dataSource = dataSource;
  }

  async createTable(personName: TableModel): Promise<Either<ErrorClass, TableEntity>> {
    // return await this.dataSource.create(personName);
    try {
      let i = await this.dataSource.create(personName);
      return Right<ErrorClass, TableEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "phoneNumber_conflict"){
        return Left<ErrorClass, TableEntity>(ApiError.phoneNumberExits());
      }
      return Left<ErrorClass, TableEntity>(ApiError.badRequest());
    }
  }

  async deleteTable(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateTable(id: string, data: TableModel): Promise<Either<ErrorClass, TableEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, TableEntity>(i);
    } catch {
      return Left<ErrorClass, TableEntity>(ApiError.badRequest());
    }
  }

  async getTables(): Promise<Either<ErrorClass, TableEntity[]>> {
    // return await this.dataSource.getAllTables();
    try {
      let i = await this.dataSource.getAllTables();
      return Right<ErrorClass, TableEntity[]>(i);
    } catch {
      return Left<ErrorClass, TableEntity[]>(ApiError.badRequest());
    }
  }

  async getTableById(id: string): Promise<Either<ErrorClass, TableEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, TableEntity | null>(i);
    } catch {
      return Left<ErrorClass, TableEntity | null>(ApiError.badRequest());
    }
  }
}
