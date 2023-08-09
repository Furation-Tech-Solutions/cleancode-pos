import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface UpdateDeliverypartnerUsecase {
    execute : (deliverypartnerId : string, data: Partial<DeliverypartnerModel>) => Promise<Either<ErrorClass, DeliverypartnerEntity>>
}

export class UpdateDeliverypartner implements UpdateDeliverypartnerUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository

    constructor (deliverypartnerRepository : DeliverypartnerRepository){
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerId : string, data : Partial<DeliverypartnerModel>) : Promise<Either<ErrorClass, DeliverypartnerEntity>>{
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