import { DeliverypartnerEntity } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";


export interface GetAllDeliverypartnerUsecase {
    execute : () => Promise<DeliverypartnerEntity[]>
}

export class GetAllDeliverypartner implements GetAllDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository) {
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute () : Promise<DeliverypartnerEntity[]> {
        return await this.deliverypartnerRepository.getAllDeliverypartner();
    }
}