import { DeliveryPartnerModel, DeliveryPartnerEntity } from "@domain/deliveryPartner/entities/deliveryPartner";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface DeliveryPartnerRepository {
  createDeliveryPartner(deliveryPartner: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>>;
  deleteDeliveryPartner(id: string): Promise<Either<ErrorClass, void>>;
  updateDeliveryPartner(id: string, data: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>>;
  getDeliveryPartners(): Promise<Either<ErrorClass, DeliveryPartnerEntity[]>>;
  getDeliveryPartnerById(id: string): Promise<Either<ErrorClass, DeliveryPartnerEntity | null>>;
}
