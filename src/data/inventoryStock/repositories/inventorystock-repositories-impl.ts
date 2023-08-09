import { InventorystockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { InventorystockDataSource } from "../datasources/inventorystock-data-source";
import { InventorystockEntity, InventorystockModel } from "@domain/inventoryStock/entities/inventoryStock";
import { Either, Left, Right } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class InventorystockRepositoryImpl implements InventorystockRepository {
    private readonly datasource: InventorystockDataSource;

    constructor ( datasource : InventorystockDataSource ){
        this.datasource= datasource
    }

    async createInventorystock(inventorystock: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
        try {
            let i= await this.datasource.create(inventorystock);
            return Right<ErrorClass, InventorystockEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, InventorystockEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, InventorystockEntity>(ApiError.badRequest());
        }
    }

    async deleteInventorystock(id: string): Promise<Either<ErrorClass, void>> {
        try {
            let i= await this.datasource.delete(id);
            return Right<ErrorClass, void>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateInventorystock(id: string, data: InventorystockModel): Promise<Either<ErrorClass, InventorystockEntity>> {
        try {
            let i= await this.datasource.update(id, data);
            return Right<ErrorClass, InventorystockEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, InventorystockEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, InventorystockEntity>(ApiError.badRequest());
        }
    }

    async getAllInventorystock(): Promise<Either<ErrorClass, InventorystockEntity[]>> {
        try {
            let i= await this.datasource.getAllInventorystock();
            return Right<ErrorClass, InventorystockEntity[]>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, InventorystockEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, InventorystockEntity[]>(ApiError.badRequest());
        }
    }

    async getInventorystockById(id: string): Promise<Either<ErrorClass, InventorystockEntity>> {
        try {
            let i= await this.datasource.read(id);
            return Right<ErrorClass, InventorystockEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, InventorystockEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, InventorystockEntity>(ApiError.badRequest());
        }
    }
}