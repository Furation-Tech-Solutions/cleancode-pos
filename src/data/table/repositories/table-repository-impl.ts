import { TableModel, TableEntity } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { TableDataSource } from "@data/table/datasources/table-data-source";

export class TableRepositoryImpl implements TableRepository {
  private readonly dataSource: TableDataSource;

  constructor(dataSource: TableDataSource) {
    this.dataSource = dataSource;
  }

  async createTable(table: TableModel): Promise<TableEntity> {
    return await this.dataSource.create(table);
  }

  async deleteTable(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateTable(id: string, data: TableModel): Promise<TableEntity> {
    return await this.dataSource.update(id, data);
  }

  async getTables(): Promise<TableEntity[]> {
    return await this.dataSource.getAllTables();
  }

  async getTableById(id: string): Promise<TableEntity | null> {
    return await this.dataSource.read(id);
  }
}
