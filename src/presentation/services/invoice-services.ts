import { NextFunction, Request, Response } from "express";
import {
  InvoiceModel,
  InvoiceEntity,
  InvoiceMapper,
} from "@domain/invoice/entities/invoice";
import { CreateInvoiceUsecase } from "@domain/invoice/usecases/create-invoice";
import { DeleteInvoiceUsecase } from "@domain/invoice/usecases/delete-invoice";
import { GetInvoiceByIdUsecase } from "@domain/invoice/usecases/get-invoice-by-id";
import { UpdateInvoiceUsecase } from "@domain/invoice/usecases/update-invoice";
import { GetAllInvoicesUsecase } from "@domain/invoice/usecases/get-all-invoice";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { AutoInvoiceNumber } from "@presentation/middlewares/invoice/invoiceNumber";

export class InvoiceService {
  private readonly CreateInvoiceUsecase: CreateInvoiceUsecase;
  private readonly DeleteInvoiceUsecase: DeleteInvoiceUsecase;
  private readonly GetInvoiceByIdUsecase: GetInvoiceByIdUsecase;
  private readonly UpdateInvoiceUsecase: UpdateInvoiceUsecase;
  private readonly GetAllInvoicesUsecase: GetAllInvoicesUsecase;

  constructor(
    CreateInvoiceUsecase: CreateInvoiceUsecase,
    DeleteInvoiceUsecase: DeleteInvoiceUsecase,
    GetInvoiceByIdUsecase: GetInvoiceByIdUsecase,
    UpdateInvoiceUsecase: UpdateInvoiceUsecase,
    GetAllInvoicesUsecase: GetAllInvoicesUsecase
  ) {
    this.CreateInvoiceUsecase = CreateInvoiceUsecase;
    this.DeleteInvoiceUsecase = DeleteInvoiceUsecase;
    this.GetInvoiceByIdUsecase = GetInvoiceByIdUsecase;
    this.UpdateInvoiceUsecase = UpdateInvoiceUsecase;
    this.GetAllInvoicesUsecase = GetAllInvoicesUsecase;
  }

  async createInvoice(req: Request, res: Response): Promise<void> {
    // Generate the billing number as a string
  const invoice_number: string = AutoInvoiceNumber.generateNumberInvoice("F-");

  // Ensure req.body exists and create an 'billing' property
  req.body = req.body || {};
  req.body.invoice_number = invoice_number;

      // Extract Invoice data from the request body and convert it to InvoiceModel
      const invoiceData: InvoiceModel = InvoiceMapper.toModel(req.body);

      // Call the CreateInvoiceUsecase to create the invoice
      const newInvoice: Either<ErrorClass, InvoiceEntity> = await this.CreateInvoiceUsecase.execute(
        invoiceData
      );

      newInvoice.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: InvoiceEntity) =>{
          const responseData = InvoiceMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteInvoice(req: Request, res: Response): Promise<void> {
      const invoiceId: string = req.params.invoiceId;
    

      const updatedInvoiceEntity: InvoiceEntity = InvoiceMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateTableUsecase to update the table
      const updatedAre: Either<ErrorClass, InvoiceEntity> = await this.UpdateInvoiceUsecase.execute(
        invoiceId,
        updatedInvoiceEntity
      );

      updatedAre.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: InvoiceEntity) =>{
          const responseData = InvoiceMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getInvoiceById(req: Request, res: Response): Promise<void> {
      const invoiceId: string = req.params.invoiceId;

      // Call the GetInvoiceByIdUsecase to get the invoice by ID
      const invoice: Either<ErrorClass, InvoiceEntity | null> = await this.GetInvoiceByIdUsecase.execute(
        invoiceId
      );

      invoice.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: InvoiceEntity | null) =>{
          const responseData = InvoiceMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateInvoice(req: Request, res: Response): Promise<void> {
      const invoiceId: string = req.params.invoiceId;
      const invoiceData: InvoiceModel = req.body;

      // Get the existing invoice by ID
      const existingInvoice: Either<ErrorClass, InvoiceEntity | null> =
        await this.GetInvoiceByIdUsecase.execute(invoiceId);

      if (!existingInvoice) {
        // If invoice is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert invoiceData from InvoiceModel to InvoiceEntity using InvoiceMapper
      const updatedInvoiceEntity: InvoiceEntity = InvoiceMapper.toEntity(
        invoiceData,
        true
      );

      // Call the UpdateInvoiceUsecase to update the Invoice
      const updatedInvoice: Either<ErrorClass, InvoiceEntity> = await this.UpdateInvoiceUsecase.execute(
        invoiceId,
        updatedInvoiceEntity
      );

      updatedInvoice.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: InvoiceEntity) =>{
          const responseData = InvoiceMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
      // Call the GetAllInvoicesUsecase to get all Invoices
      const invoices: Either<ErrorClass, InvoiceEntity[]> = await this.GetAllInvoicesUsecase.execute();
      
      invoices.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: InvoiceEntity[]) => {
            // Filter out invoices with del_status set to "Deleted"
            const nonDeletedInvoices = result.filter((invoice) => invoice.del_status !== false);

            // Convert non-deleted invoices from an array of InvoiceEntity to an array of plain JSON objects using FoodCategoryMapper
            const responseData = nonDeletedInvoices.map((invoice) => InvoiceMapper.toEntity(invoice));
            return res.json(responseData);
        }
    );
  }
}
