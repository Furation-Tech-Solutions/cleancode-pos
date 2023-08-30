import { DeliveryPartnerEntity, DeliveryPartnerModel } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartnerRepository } from "@domain/deliveryPartner/repositories/deliveryPartner-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface CreateDeliveryPartnerUsecase {
  execute: (DeliveryPartnerData: DeliveryPartnerModel) => Promise<Either<ErrorClass, DeliveryPartnerEntity>>;
}

export class CreateDeliveryPartner implements CreateDeliveryPartnerUsecase {
  private readonly deliveryPartnerRepository: DeliveryPartnerRepository;

  constructor(deliveryPartnerRepository: DeliveryPartnerRepository) {
    this.deliveryPartnerRepository = deliveryPartnerRepository;
  }

  async execute(deliveryPartnerData: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>> {
    return await this.deliveryPartnerRepository.createDeliveryPartner(deliveryPartnerData);
  }
}
