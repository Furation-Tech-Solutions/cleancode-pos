import {InvoiceModel,InvoiceEntity } from "@domain/invoice/entities/invoice";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error"
export interface InvoiceRepository {
  createInvoice(invoice: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>>;
  deleteInvoice(id: string): Promise<Either<ErrorClass, void>>;
  updateInvoice(id: string, data: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>>;
  getInvoices(): Promise<Either<ErrorClass, InvoiceEntity[]>>;
  getInvoiceById(id: string): Promise<Either<ErrorClass, InvoiceEntity | null>>;
}