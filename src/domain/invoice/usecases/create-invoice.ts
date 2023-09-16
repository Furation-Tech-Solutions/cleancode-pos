import { InvoiceEntity, InvoiceModel } from "@domain/invoice/entities/invoice";
import { InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateInvoiceUsecase {
  execute: (invoiceData: InvoiceModel) => Promise<Either<ErrorClass, InvoiceEntity>>;
}

export class CreateInvoice implements CreateInvoiceUsecase {
  private readonly InvoiceRepository: InvoiceRepository;

  constructor(InvoiceRepository: InvoiceRepository) {
    this.InvoiceRepository = InvoiceRepository;
  }

  async execute(invoiceData: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>> {
    return await this.InvoiceRepository.createInvoice(invoiceData);
  }
}