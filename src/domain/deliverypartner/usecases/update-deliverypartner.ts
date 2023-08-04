import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";


export interface UpdateDeliverypartnerUsecase {
    execute : (deliverypartnerId : string, data: Partial<DeliverypartnerModel>) => Promise<DeliverypartnerEntity>
}

export class UpdateDeliverypartner implements UpdateDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository

    constructor (deliverypartnerRepository : DeliverypartnerRepository){
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerId : string, data : Partial<DeliverypartnerModel>) : Promise<DeliverypartnerEntity>{
        const existingDeliverypartner : DeliverypartnerEntity | null = 
        await this.deliverypartnerRepository.getDeliverypartnerById(deliverypartnerId);

        if(!existingDeliverypartner){ 
            throw new Error("Deliverypartner is not found");    
        }

        const updatedDeliverypartnerData:DeliverypartnerModel= {...existingDeliverypartner, ...data};

        await this.deliverypartnerRepository.updateDeliverypartner(deliverypartnerId, updatedDeliverypartnerData);

        const updatedDeliverypartnerEntity : DeliverypartnerEntity | null=
        await this.deliverypartnerRepository.getDeliverypartnerById(deliverypartnerId);

        if(!updatedDeliverypartnerEntity){
            throw new Error("Delivery partner not found after update");
        }

        return updatedDeliverypartnerEntity;
    }
}