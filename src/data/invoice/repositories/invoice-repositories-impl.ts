import { InvoiceModel, InvoiceEntity } from "@domain/invoice/entities/invoice";
import { InvoiceRepository } from "@domain/invoice/repositories/invoice-repository";
import { InvoiceDataSource } from "@data/invoice/datasources/invoice-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class InvoiceRepositoryImpl implements InvoiceRepository {
  private readonly dataSource: InvoiceDataSource;

  constructor(dataSource: InvoiceDataSource) {
    this.dataSource = dataSource;
  }

  async createInvoice(invoice: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>> {
    // return await this.dataSource.create(invoice);
    try {
      let i = await this.dataSource.create(invoice);
      return Right<ErrorClass, InvoiceEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, InvoiceEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, InvoiceEntity>(ApiError.badRequest());
    }
  }

  async deleteInvoice(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateInvoice(id: string, data: InvoiceModel): Promise<Either<ErrorClass, InvoiceEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, InvoiceEntity>(i);
    } catch {
      return Left<ErrorClass, InvoiceEntity>(ApiError.badRequest());
    }
  }

  async getInvoices(): Promise<Either<ErrorClass, InvoiceEntity[]>> {
    // return await this.dataSource.getAllInvoices();
    try {
      let i = await this.dataSource.getAllInvoices();
      return Right<ErrorClass, InvoiceEntity[]>(i);
    } catch {
      return Left<ErrorClass, InvoiceEntity[]>(ApiError.badRequest());
    }
  }

  async getInvoiceById(id: string): Promise<Either<ErrorClass, InvoiceEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, InvoiceEntity | null>(i);
    } catch {
      return Left<ErrorClass, InvoiceEntity | null>(ApiError.badRequest());
    }
  }
}