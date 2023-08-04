import { DeliverypartnerEntity } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";


export interface GetDeliverypartnerByIdUsecase {
    execute : (deliverypartnerId: string) => Promise<DeliverypartnerEntity | null>;
}

export class GetDeliverypartnerById implements GetDeliverypartnerByIdUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository){
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerId: string) : Promise<DeliverypartnerEntity | null>{
        return await this.deliverypartnerRepository.getDeliverypartnerById(deliverypartnerId);
    }
}