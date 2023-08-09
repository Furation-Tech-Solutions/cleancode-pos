import { Either } from "monet";
import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner";
import ErrorClass from "@presentation/error-handling/api-error";


export interface DeliverypartnerRepository{
    createDeliverypartner(deliverypartner:DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>>;
    deleteDeliverypartner(id:string): Promise<Either<ErrorClass, void>>;
    getAllDeliverypartner() : Promise<Either<ErrorClass, DeliverypartnerEntity[]>>;
    getDeliverypartnerById(id: string) : Promise<Either<ErrorClass, DeliverypartnerEntity | null>>;
    updateDeliverypartner(id: string, data: DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>>
}