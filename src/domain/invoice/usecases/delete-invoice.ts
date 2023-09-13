import { type InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteInvoiceUsecase {
  execute: (invoiceId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteInvoice implements DeleteInvoiceUsecase {
  private readonly invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(invoiceId: string): Promise<Either<ErrorClass, void>> {
    return await this.invoiceRepository.deleteInvoice(invoiceId);
  }
}
