import { AreaModel, AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { AreaDataSource } from "@data/area/datasources/area-data-source";

export class AreaRepositoryImpl implements AreaRepository {
  private readonly dataSource: AreaDataSource;

  constructor(dataSource: AreaDataSource) {
    this.dataSource = dataSource;
  }

  async createArea(area: AreaModel): Promise<AreaEntity> {
    return await this.dataSource.create(area);
  }

  async deleteArea(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateArea(id: string, data: AreaModel): Promise<AreaEntity> {
    return await this.dataSource.update(id, data);
  }

  async getAreas(): Promise<AreaEntity[]> {
    return await this.dataSource.getAllAreas();
  }

  async getAreaById(id: string): Promise<AreaEntity | null> {
    return await this.dataSource.read(id);
  }
}