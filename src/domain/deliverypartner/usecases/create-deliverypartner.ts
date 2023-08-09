import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner"
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories"
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface CreateDeliverypartnerUsecase {
    execute: (deliverypartnerData: DeliverypartnerModel) => Promise<Either<ErrorClass, DeliverypartnerEntity>>
}

export class CreateDeliverypartner implements CreateDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerData: DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>> {
        return await this.deliverypartnerRepository.createDeliverypartner(deliverypartnerData);
    }
}