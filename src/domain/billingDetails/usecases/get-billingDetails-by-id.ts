import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetBillingDetailsByIdUsecase {
  execute: (billingDetailsId: string) => Promise<Either<ErrorClass, BillingDetailsEntity | null>>;
}

export class GetBillingDetailsById implements GetBillingDetailsByIdUsecase {
  private readonly billingDetailsRepository: BillingDetailsRepository;

  constructor(billingDetailsRepository: BillingDetailsRepository) {
    this.billingDetailsRepository = billingDetailsRepository;
  }

  async execute(billingDetailsId: string): Promise<Either<ErrorClass, BillingDetailsEntity | null>> {
    return await this.billingDetailsRepository.getBillingDetailsById(billingDetailsId);
  }
}
