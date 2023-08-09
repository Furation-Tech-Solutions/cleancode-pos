import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface DeleteDeliverypartnerUsecase {
    execute : (deliverypartnerId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteDeliverypartner implements DeleteDeliverypartnerUsecase{
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute (deliverypartnerId: string) : Promise<Either<ErrorClass, void>> {
        return await this.deliverypartnerRepository.deleteDeliverypartner(deliverypartnerId);
    }
}