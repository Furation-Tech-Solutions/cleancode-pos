import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateBillingDetailsUsecase {
  execute: (billingDetailsData: BillingDetailsModel) => Promise<Either<ErrorClass, BillingDetailsEntity>>;
}

export class CreateBillingDetails implements CreateBillingDetailsUsecase {
  private readonly billingDetailsRepository: BillingDetailsRepository;

  constructor(billingDetailsRepository: BillingDetailsRepository) {
    this.billingDetailsRepository = billingDetailsRepository;
  }

  async execute(billingDetailsData: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>> {
    return await this.billingDetailsRepository.createBillingDetails(billingDetailsData);
  }
}
