import { DeliveryPartnerEntity } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartnerRepository } from "@domain/deliveryPartner/repositories/deliveryPartner-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetDeliveryPartnerByIdUsecase {
  execute: (DeliveryPartnerId: string) => Promise<Either<ErrorClass, DeliveryPartnerEntity | null>>;
}

export class GetDeliveryPartnerById implements GetDeliveryPartnerByIdUsecase {
  private readonly deliveryPartnerRepository: DeliveryPartnerRepository;

  constructor(deliveryPartnerRepository: DeliveryPartnerRepository) {
    this.deliveryPartnerRepository = deliveryPartnerRepository;
  }

  async execute(deliveryPartnerId: string): Promise<Either<ErrorClass, DeliveryPartnerEntity | null>> {
    return await this.deliveryPartnerRepository.getDeliveryPartnerById(deliveryPartnerId);
  }
}
