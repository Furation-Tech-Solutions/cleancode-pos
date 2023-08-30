import { DeliveryPartnerEntity } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartnerRepository } from "@domain/deliveryPartner/repositories/deliveryPartner-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllDeliveryPartnersUsecase {
  execute: () => Promise<Either<ErrorClass, DeliveryPartnerEntity[]>>;
}

export class GetAllDeliveryPartners implements GetAllDeliveryPartnersUsecase {
  private readonly deliveryPartnerRepository: DeliveryPartnerRepository;

  constructor(deliveryPartnerRepository: DeliveryPartnerRepository) {
    this.deliveryPartnerRepository = deliveryPartnerRepository;
  }

  async execute(): Promise<Either<ErrorClass, DeliveryPartnerEntity[]>> {
    return await this.deliveryPartnerRepository.getDeliveryPartners();
  }
}
