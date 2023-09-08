import { PaymentModel, PaymentEntity } from "@domain/payment/entities/payment";
import { PaymentRepository } from "@domain/payment/repositories/payment-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllPaymentsUsecase {
  execute: () => Promise<Either<ErrorClass, PaymentEntity[]>>;
}

export class GetAllPayments implements GetAllPaymentsUsecase {
  private readonly paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(): Promise<Either<ErrorClass, PaymentEntity[]>> {
    return await this.paymentRepository.getPayments();
  }
}
