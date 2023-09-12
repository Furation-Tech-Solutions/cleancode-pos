import { DeliveryPartnerEntity, DeliveryPartnerModel } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartnerRepository } from "@domain/deliveryPartner/repositories/deliveryPartner-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateDeliveryPartnerUsecase {
  execute: (
    DeliveryPartnerId: string,
    DeliveryPartnerData: DeliveryPartnerModel
  ) => Promise<Either<ErrorClass, DeliveryPartnerEntity>>;
}

export class UpdateDeliveryPartner implements UpdateDeliveryPartnerUsecase {
  private readonly deliveryPartnerRepository: DeliveryPartnerRepository;

  constructor(deliveryPartnerRepository: DeliveryPartnerRepository) {
    this.deliveryPartnerRepository = deliveryPartnerRepository;
  }

  async execute(deliveryPartnerId: string, deliveryPartnerData: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>> {
    return await this.deliveryPartnerRepository.updateDeliveryPartner(deliveryPartnerId, deliveryPartnerData);
  }
}
