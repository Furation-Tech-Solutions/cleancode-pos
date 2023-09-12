import {type BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteBillingDetailsUsecase {
  execute: (billingDetailsId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteBillingDetails implements DeleteBillingDetailsUsecase {
  private readonly billingDetailsRepository: BillingDetailsRepository;

  constructor(billingDetailsRepository: BillingDetailsRepository) {
    this.billingDetailsRepository = billingDetailsRepository;
  }

  async execute(billingDetailsId: string): Promise<Either<ErrorClass, void>> {
    return await this.billingDetailsRepository.deleteBillingDetails(billingDetailsId);
  }
}
