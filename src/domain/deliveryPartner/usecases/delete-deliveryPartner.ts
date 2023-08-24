import { type DeliveryPartnerRepository } from "../repositories/deliveryPartner-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteDeliveryPartnerUsecase {
  execute: (DeliveryPartnerId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteDeliveryPartner implements DeleteDeliveryPartnerUsecase {
  private readonly deliveryPartnerRepository: DeliveryPartnerRepository;

  constructor(deliveryPartnerRepository: DeliveryPartnerRepository) {
    this.deliveryPartnerRepository = deliveryPartnerRepository;
  }

  async execute(deliveryPartnerId: string): Promise<Either<ErrorClass, void>> {
    return await this.deliveryPartnerRepository.deleteDeliveryPartner(deliveryPartnerId);
  }
}
