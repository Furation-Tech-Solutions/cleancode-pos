import { DeliverypartnerEntity } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetAllDeliverypartnerUsecase {
    execute : () => Promise<Either<ErrorClass, DeliverypartnerEntity[]>>
}

export class GetAllDeliverypartner implements GetAllDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute () : Promise<Either<ErrorClass, DeliverypartnerEntity[]>> {
        return await this.deliverypartnerRepository.getAllDeliverypartner();
    }
}