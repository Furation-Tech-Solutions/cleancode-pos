import { InvoiceEntity } from "@domain/invoice/entities/invoice";
import { InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetInvoiceByIdUsecase {
  execute: (invoiceId: string) => Promise<Either<ErrorClass, InvoiceEntity | null>>;
}

export class GetInvoiceById implements GetInvoiceByIdUsecase {
  private readonly invoiceRepository:InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(invoiceId: string): Promise<Either<ErrorClass, InvoiceEntity | null>> {
    return await this.invoiceRepository.getInvoiceById(invoiceId);
  }
}