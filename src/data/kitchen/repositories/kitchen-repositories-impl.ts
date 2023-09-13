import {
  KitchenModel,
  KitchenEntity,
  KitchenMapper,
} from "@domain/kitchen/entities/kitchen";
import { KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import {
  KitchenDataSource,
  KitchenDataSourceImpl,
} from "@data/kitchen/datasources/kitchen-data-source";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { Kitchen } from "../models/kitchen-model";
import { kitchenRouter } from "@presentation/routes/kitchen-routes";

export class KitchenRepowsitoryImpl implements KitchenRepository {
  private readonly dataSource: KitchenDataSource;

  constructor(dataSource: KitchenDataSource) {
    this.dataSource = dataSource;
  }

  async createKitchen(
    kitchen: KitchenModel
  ): Promise<Either<ErrorClass, KitchenEntity>> {
    try {
      let i = await this.dataSource.create(kitchen);
      return Right<ErrorClass, KitchenEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, KitchenEntity>(ApiError.kitchen_codeExists());
      }
      return Left<ErrorClass, KitchenEntity>(ApiError.badRequest());
    }
  }

  async deleteKitchen(kitchen: string): Promise<Either<ErrorClass, void>> {
    try {
      let i = await this.dataSource.delete(kitchen);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateKitchen(
    id: string,
    data: KitchenModel
  ): Promise<Either<ErrorClass, KitchenEntity>> {
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, KitchenEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, KitchenEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, KitchenEntity>(ApiError.badRequest());
    }
  }

  async getKitchens(): Promise<Either<ErrorClass, KitchenEntity[]>> {
    try {
      let i = await this.dataSource.getAllkitchens();
      return Right<ErrorClass, KitchenEntity[]>(i);
    } catch {
      return Left<ErrorClass, KitchenEntity[]>(ApiError.badRequest());
    }
  }

  async getKitchenById(
    id: string
  ): Promise<Either<ErrorClass, KitchenEntity | null>> {
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, KitchenEntity | null>(i);
    } catch (error) {
      return Left<ErrorClass, KitchenEntity | null>(ApiError.badRequest());
    }
  }
}
