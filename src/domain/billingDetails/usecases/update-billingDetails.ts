import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateBillingDetailsUsecase {
  execute: (
    billingDetailsId: string,
    billingDetailsData: BillingDetailsModel
  ) => Promise<Either<ErrorClass, BillingDetailsEntity>>;
}

export class UpdateBillingDetails implements UpdateBillingDetailsUsecase {
  private readonly billingDetailsRepository: BillingDetailsRepository;

  constructor(billingDetailsRepository: BillingDetailsRepository) {
    this.billingDetailsRepository = billingDetailsRepository;
  }
  async execute(billingDetailsId: string, billingDetailsData: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>> {
   return await this.billingDetailsRepository.updateBillingDetails(billingDetailsId, billingDetailsData);
 }
}
