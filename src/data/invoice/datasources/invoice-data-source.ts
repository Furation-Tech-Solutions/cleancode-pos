import { InvoiceModel, InvoiceEntity } from "@domain/invoice/entities/invoice";
import { Invoice } from "../models/invoice-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface InvoiceDataSource {
  create(invoice: InvoiceModel): Promise<any>; // Return type should be Promise of InvoiceEntity
  update(id: string, invoice: InvoiceModel): Promise<any>; // Return type should be Promise of InvoiceEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of InvoiceEntity or null
  getAllInvoices(): Promise<any[]>; // Return type should be Promise of an array of InvoiceEntity
}

export class InvoiceDataSourceImpl implements InvoiceDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(invoice: InvoiceModel): Promise<any> {
    // const existingInvoice = await Invoice.findOne({outletCode_byId: invoice.outletCode_byId});
    // if (existingInvoice) {
    //   throw ApiError.invoiceNameExists()
    // }

    const invoiceData = new Invoice(invoice);

    const createInvoice = await invoiceData.save();
    
    return createInvoice.toObject();
  }

  async update(id: string, invoice: InvoiceModel): Promise<any> {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice, {
      new: true,
    }); // No need for conversion here
    return updatedInvoice ? updatedInvoice.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Invoice.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const invoice = await Invoice.findById(id);
    return invoice ? invoice.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInvoices(): Promise<any[]> {
    const invoices = await Invoice.find();
    return invoices.map((invoice) => invoice.toObject()); // Convert to plain JavaScript objects before returning
  }
}
