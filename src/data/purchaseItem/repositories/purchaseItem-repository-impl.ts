import {
    PurchaseItemEntity,
    PurchaseItemModel,
} from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { PurchaseItemDataSource } from "@data/purchaseItem/datasource/purchaseItem-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class PurchaseItemRepositoryImpl implements PurchaseItemRepository {
    private readonly dataSource: PurchaseItemDataSource;

    constructor(dataSource: PurchaseItemDataSource) {
        this.dataSource = dataSource;
    }

    async createPurchaseItem(
        purchaseItem: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        try {
            const i = await this.dataSource.create(purchaseItem);
            return Right<ErrorClass, PurchaseItemEntity>(i);
        } catch (error) {
            
            
            if (error instanceof ApiError && error.status === 401) {
                return Left<ErrorClass, PurchaseItemEntity>(ApiError.unAuthorized());
            }
            return Left<ErrorClass, PurchaseItemEntity>(ApiError.badRequest());
        }
    }

    async getPurchaseItemById(
        id: string
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        try {
            const response = await this.dataSource.getById(id);
            if (response === null) {
                return Left<ErrorClass, PurchaseItemEntity>(ApiError.notFound());
            }
            return Right<ErrorClass, PurchaseItemEntity>(response);
        } catch (error) {
            return Left<ErrorClass, PurchaseItemEntity>(ApiError.badRequest());
        }
    }

    async getPurchaseItems(): Promise<
        Either<ErrorClass, PurchaseItemEntity[]>
    > {
        try {
            const response = await this.dataSource.getAllPurchaseItems();
            return Right<ErrorClass, PurchaseItemEntity[]>(response);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                return Left<ErrorClass, PurchaseItemEntity[]>(ApiError.unAuthorized());
            }
            return Left<ErrorClass, PurchaseItemEntity[]>(ApiError.badRequest());
        }
    }

    async updatePurchaseItem(
        id: string,
        data: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        try {
            const response = await this.dataSource.update(id, data);
            return Right<ErrorClass, PurchaseItemEntity>(response);
        } catch (error) {
            return Left<ErrorClass, PurchaseItemEntity>(ApiError.badRequest());
        }
    }

    async deletePurchaseItem(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const res = await this.dataSource.delete(id);
            return Right<ErrorClass, void>(res);
        } catch (error) {
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }
}