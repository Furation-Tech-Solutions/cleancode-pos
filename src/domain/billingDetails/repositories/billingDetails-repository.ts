import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface BillingDetailsRepository {
  createBillingDetails(BillingDetails: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>>;
  deleteBillingDetails(id: string): Promise<Either<ErrorClass, void>>;
  updateBillingDetails(id: string, data: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>>;
  getBillingDetailss(): Promise<Either<ErrorClass, BillingDetailsEntity[]>>;
  getBillingDetailsById(id: string): Promise<Either<ErrorClass, BillingDetailsEntity | null>>;
}

