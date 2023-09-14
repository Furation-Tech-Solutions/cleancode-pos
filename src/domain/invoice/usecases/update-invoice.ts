import { InvoiceEntity, InvoiceModel } from "@domain/invoice/entities/invoice";
import { InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateInvoiceUsecase {
  execute: (
    invoiceId: string,
    invoiceData: InvoiceModel
  ) => Promise<Either<ErrorClass, InvoiceEntity>>;
}

export class UpdateInvoice implements UpdateInvoiceUsecase {
  private readonly invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(invoiceId: string, invoiceData: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>> {
    return await this.invoiceRepository.updateInvoice(invoiceId, invoiceData);
  }
}
