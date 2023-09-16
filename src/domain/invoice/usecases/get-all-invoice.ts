import { InvoiceEntity } from "@domain/invoice/entities/invoice";
import { InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllInvoicesUsecase {
  execute: () => Promise<Either<ErrorClass, InvoiceEntity[]>>;
}

export class GetAllInvoices implements GetAllInvoicesUsecase {
  private readonly invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(): Promise<Either<ErrorClass, InvoiceEntity[]>> {
    return await this.invoiceRepository.getInvoices();
  }
}
