import { DeliverypartnerModel } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";


export interface DeleteDeliverypartnerUsecase {
    execute : (deliverypartnerId: string) => Promise<void>
}

export class DeleteDeliverypartner implements DeleteDeliverypartnerUsecase{
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute (deliverypartnerId: string) : Promise<void> {
        await this.deliverypartnerRepository.deleteDeliverypartner(deliverypartnerId);
    }
}