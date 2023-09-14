// Express API request populate the Invoice Model
import { Date } from "mongoose";
export class InvoiceModel {
    constructor(
      public invoice_number: number,
      public outlet_id: string[] = [],
      public inventory_id: string[] = [],
      public dateTime: Date,
      public items: number[] = [],
      public subtotal: number = 0,
      public tax_rate: number = 0,
      public discount_amount: number = 0,
      public total: number = 0,
      public payment_method: string = "",
      public payment_status: string = "",
      public del_status: boolean

    ) {}
  }
  
  // Invoice Entity provided by Invoice Repository is converted to Express API Response
  export class InvoiceEntity {
    constructor( 
      public id: string | undefined = undefined, // Set a default value for id
      
      public invoice_number: number,
      public outlet_id: string[],
      public inventory_id: string[],
      public dateTime: Date,
      public items: number[],
      public subtotal: number,
      public tax_rate: number,
      public discount_amount: number,
      public total: number,
      public payment_method: string,
      public payment_status: string,
      public del_status: boolean

      ) {}
  }
  
  
  export class InvoiceMapper {
    static toEntity(
        invoiceData: any,
      includeId?: boolean,
      existingInvoice?: InvoiceEntity
    ): InvoiceEntity {
      if (existingInvoice != null) {
        // If existingInvoice is provided, merge the data from invoiceData with the existingInvoice
        return {
          ...existingInvoice,
          invoice_number:
            invoiceData.invoice_number !==undefined ? invoiceData.invoice_number : existingInvoice.invoice_number,
          outlet_id:
            invoiceData.outlet_id !== undefined? invoiceData.outlet_id : existingInvoice.outlet_id,
          inventory_id:
            invoiceData.inventory_id !==undefined ? invoiceData.inventory_id : existingInvoice.inventory_id,
          dateTime:
            invoiceData.dateTime !== undefined? invoiceData.dateTime: existingInvoice.dateTime,
          items:
            invoiceData.items !== undefined ? invoiceData.items: existingInvoice.items,
          subtotal:
            invoiceData.subtotal !== undefined ? invoiceData.subtotal: existingInvoice.subtotal,
          tax_rate:
            invoiceData.tax_rate !== undefined ? invoiceData.tax_rate: existingInvoice.tax_rate,
          discount_amount:
            invoiceData.discount_amount !== undefined ? invoiceData.discount_amount: existingInvoice.discount_amount,
          total:
            invoiceData.total !== undefined ? invoiceData.total: existingInvoice.total,
          payment_method:
            invoiceData.payment_method !== undefined ? invoiceData.payment_method: existingInvoice.payment_method,
          payment_status:
            invoiceData.payment_status !== undefined ? invoiceData.payment_status: existingInvoice.payment_status,
          del_status:
            invoiceData.del_status !==undefined ? invoiceData.del_status : existingInvoice.del_status,
        };
      } else {
        // If existingInvoice is not provided, create a new invoiceEntity using invoiceData
        const invoiceEntity: InvoiceEntity = {
            id: includeId ? (invoiceData._id ? invoiceData._id.toString() : undefined) : invoiceData._id.toString(),
            invoice_number: invoiceData.invoice_number,
            outlet_id: invoiceData.outlet_id,
            inventory_id: invoiceData.inventory_id,
            dateTime: invoiceData.dateTime,
            items: invoiceData.items,
            subtotal: invoiceData.subtotal,
            tax_rate: invoiceData.tax_rate,
            discount_amount: invoiceData.discount_amount,
            total: invoiceData.total,
            payment_method: invoiceData.payment_method,
            payment_status: invoiceData.payment_status,
            del_status: invoiceData.del_status,
        };
        return invoiceEntity;
      }
    }
    static toModel(invoice: InvoiceEntity): any {
      return {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        outlet_id: invoice.outlet_id,
        inventory_id: invoice.inventory_id,
        dateTime: invoice.dateTime,
        items: invoice.items,
        subtotal: invoice.subtotal,
        tax_rate: invoice.tax_rate,
        discount_amount: invoice.discount_amount,
        total: invoice.total,
        payment_method: invoice.payment_method,
        payment_status: invoice.payment_status,
        del_status: invoice.del_status, 
      };
    }
  }
  