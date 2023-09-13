import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllBillingDetailssUsecase {
  execute: () => Promise<Either<ErrorClass, BillingDetailsEntity[]>>;
}

export class GetAllBillingDetailss implements GetAllBillingDetailssUsecase {
  private readonly billingDetailsRepository: BillingDetailsRepository;

  constructor(billingDetailsRepository: BillingDetailsRepository) {
    this.billingDetailsRepository = billingDetailsRepository;
  }

  async execute(): Promise<Either<ErrorClass, BillingDetailsEntity[]>> {
    return await this.billingDetailsRepository.getBillingDetailss();
  }
}
