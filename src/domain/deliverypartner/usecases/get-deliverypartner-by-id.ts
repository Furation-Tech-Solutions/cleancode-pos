import { DeliverypartnerEntity } from "../entities/deliverypartner";
import { DeliverypartnerRepository } from "../repositories/deliverypartner-repositories";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface GetDeliverypartnerByIdUsecase {
    execute : (deliverypartnerId: string) => Promise<Either<ErrorClass, DeliverypartnerEntity | null>>;
}

export class GetDeliverypartnerById implements GetDeliverypartnerByIdUsecase {
    private readonly deliverypartnerRepository : DeliverypartnerRepository;

    constructor (deliverypartnerRepository : DeliverypartnerRepository){
        this.deliverypartnerRepository= deliverypartnerRepository;
    }

    async execute(deliverypartnerId: string) : Promise<Either<ErrorClass, DeliverypartnerEntity | null>>{
        return await this.deliverypartnerRepository.getDeliverypartnerById(deliverypartnerId);
    }
}