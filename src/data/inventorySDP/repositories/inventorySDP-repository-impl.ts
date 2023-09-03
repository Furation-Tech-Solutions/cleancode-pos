import {
    InventorySDPEntity,
    InventorySDPModel,
} from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { InventorySDPDataSource } from "@data/inventorySDP/datasource/inventorySDP-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InventorySDPRepositoryImpl implements InventorySDPRepository {
    private readonly dataSource: InventorySDPDataSource;

    constructor(dataSource: InventorySDPDataSource) {
        this.dataSource = dataSource;
    }

    async createInventorySDP(
        inventorySDP: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        try {
            const i = await this.dataSource.create(inventorySDP);
            return Right<ErrorClass, InventorySDPEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                return Left<ErrorClass, InventorySDPEntity>(ApiError.unAuthorized());
            }
            return Left<ErrorClass, InventorySDPEntity>(ApiError.badRequest());
        }
    }

    async getInventorySDPById(
        id: string
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        try {
            const response = await this.dataSource.getById(id);
            if (response === null) {
                return Left<ErrorClass, InventorySDPEntity>(ApiError.notFound());
            }
            return Right<ErrorClass, InventorySDPEntity>(response);
        } catch (error) {
            return Left<ErrorClass, InventorySDPEntity>(ApiError.badRequest());
        }
    }

    async getInventorySDPs(): Promise<
        Either<ErrorClass, InventorySDPEntity[]>
    > {
        try {
            const response = await this.dataSource.getAllInventorySDPs();
            return Right<ErrorClass, InventorySDPEntity[]>(response);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                return Left<ErrorClass, InventorySDPEntity[]>(ApiError.unAuthorized());
            }
            return Left<ErrorClass, InventorySDPEntity[]>(ApiError.badRequest());
        }
    }

    async updateInventorySDP(
        id: string,
        data: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        try {
            const response = await this.dataSource.update(id, data);
            return Right<ErrorClass, InventorySDPEntity>(response);
        } catch (error) {
            return Left<ErrorClass, InventorySDPEntity>(ApiError.badRequest());
        }
    }

    async deleteInventorySDP(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const res = await this.dataSource.delete(id);
            return Right<ErrorClass, void>(res);
        } catch (error) {
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }
}