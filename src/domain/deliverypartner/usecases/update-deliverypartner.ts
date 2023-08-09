import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface UpdateDeliverypartnerUsecase {
    execute : (deliverypartnerId : string, data: DeliverypartnerModel) => Promise<Either<ErrorClass, DeliverypartnerEntity>>
}

export class UpdateDeliverypartner implements UpdateDeliverypartnerUsecase {
    
    private readonly deliverypartnerRepository : DeliverypartnerRepository

    constructor (deliverypartnerRepository : DeliverypartnerRepository){
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerId : string, data : DeliverypartnerModel) : Promise<Either<ErrorClass, DeliverypartnerEntity>>{
        return await this.deliverypartnerRepository.updateDeliverypartner(deliverypartnerId, data);
    }
}