import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner"
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories"


export interface CreateDeliverypartnerUsecase {
    execute: (deliverypartnerData: DeliverypartnerModel) => Promise<DeliverypartnerEntity>
}

export class CreateDeliverypartner implements CreateDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerData: DeliverypartnerModel) : Promise<DeliverypartnerEntity> {
        return await this.deliverypartnerRepository.createDeliverypartner(deliverypartnerData);
    }
}