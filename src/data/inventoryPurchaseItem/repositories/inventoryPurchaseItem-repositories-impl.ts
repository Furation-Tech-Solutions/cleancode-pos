
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemRepository } from "@domain/inventoryPurchaseItem/repositories/inventoryPurchaseItem-repositories";
import { InventoryPurchaseItemDataSource } from "../datasources/inventoryPurchaseItem-data-source";
import { InventoryPurchaseItemEntity, InventoryPurchaseItemModel } from "@domain/inventoryPurchaseItem/entities/inventoryPurchaseItem";


export class InventoryPurchaseItemRepositoryImpl implements InventoryPurchaseItemRepository {
    private readonly dataSource: InventoryPurchaseItemDataSource;

    constructor (dataSource : InventoryPurchaseItemDataSource) {
        this.dataSource= dataSource;
    }

    async createInventoryPurchaseItem(inventoryPurchaseItem:InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>> {
        try {
            let i= await this.dataSource.create(inventoryPurchaseItem);
            return Right<ErrorClass,InventoryPurchaseItemEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, InventoryPurchaseItemEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, InventoryPurchaseItemEntity>(ApiError.badRequest());
        }
    }

    async deleteInventoryPurchaseItem(id:string) : Promise<Either<ErrorClass, void>> {
        try {
            let i= await this.dataSource.delete(id);
            return Right<ErrorClass, void>(i);
        } catch (error) {
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateInventoryPurchaseItem(id:string, data:InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>> {
        try {
            let i= await this.dataSource.update(id, data);
            return Right<ErrorClass, InventoryPurchaseItemEntity>(i);
        } catch (error) {
            return Left<ErrorClass, InventoryPurchaseItemEntity>(ApiError.badRequest());
        }
    }

    async getAllInventoryPurchaseItem() : Promise<Either<ErrorClass, InventoryPurchaseItemEntity[]>> {
        try {
            let i= await this.dataSource.getAllInventoryPurchaseItem();
            return Right<ErrorClass, InventoryPurchaseItemEntity[]>(i);
        } catch (error) {
            return Left<ErrorClass, InventoryPurchaseItemEntity[]>(ApiError.badRequest());
        }
    }

    async getInventoryPurchaseItemById(id:string) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>> {
        try {
            let i= await this.dataSource.read(id);
            return Right<ErrorClass, InventoryPurchaseItemEntity>(i);
        } catch (error) {
            return Left<ErrorClass, InventoryPurchaseItemEntity>(ApiError.badRequest());
        }
    }
}