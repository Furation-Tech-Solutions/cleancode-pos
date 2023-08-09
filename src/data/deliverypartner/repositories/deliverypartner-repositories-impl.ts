import { DeliverypartnerEntity, DeliverypartnerModel } from "@domain/deliverypartner/entities/deliverypartner";
import { DeliverypartnerDataSource } from "../datasources/deliverypartner-data-source";
import { DeliverypartnerRepository } from "@domain/deliverypartner/repositories/deliverypartner-repositories";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class DeliverypartnerRepositoryImpl implements DeliverypartnerRepository {
    private readonly dataSource: DeliverypartnerDataSource;

    constructor (dataSource : DeliverypartnerDataSource) {
        this.dataSource= dataSource;
    }

    async createDeliverypartner(deliverypartner:DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>> {
        try {
            let i= await this.dataSource.create(deliverypartner);
            return Right<ErrorClass, DeliverypartnerEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, DeliverypartnerEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, DeliverypartnerEntity>(ApiError.badRequest());
        }
    }

    async deleteDeliverypartner(id:string) : Promise<Either<ErrorClass, void>> {
        try {
            let i= await this.dataSource.delete(id);
            return Right<ErrorClass, void>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateDeliverypartner(id:string, data:DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>> {
        try {
            let i= await this.dataSource.update(id, data);
            return Right<ErrorClass, DeliverypartnerEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, DeliverypartnerEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, DeliverypartnerEntity>(ApiError.badRequest());
        }
    }

    async getAllDeliverypartner() : Promise<Either<ErrorClass, DeliverypartnerEntity[]>> {
        try {
            let i= await this.dataSource.getAllDeliverypartner();
            return Right<ErrorClass, DeliverypartnerEntity[]>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, DeliverypartnerEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, DeliverypartnerEntity[]>(ApiError.badRequest());
        }
    }

    async getDeliverypartnerById(id:string) : Promise<Either<ErrorClass, DeliverypartnerEntity>> {
        try {
            let i= await this.dataSource.read(id);
            return Right<ErrorClass, DeliverypartnerEntity>(i);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, DeliverypartnerEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, DeliverypartnerEntity>(ApiError.badRequest());
        }
    }
}