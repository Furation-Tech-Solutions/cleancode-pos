import { BillingDetailsModel, BillingDetailsEntity } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetailsRepository } from "@domain/billingDetails/repositories/billingDetails-repository"; 
import { BillingDetailsDataSource } from "@data/billingDetails/datasource/billingDetails-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class BillingDetailsRepositoryImpl implements BillingDetailsRepository {
  private readonly dataSource: BillingDetailsDataSource;

  constructor(dataSource: BillingDetailsDataSource) {
    this.dataSource = dataSource;
  }

  async createBillingDetails(billingDetails: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>> {
    // return await this.dataSource.create(billingDetails);
    try {
      let i = await this.dataSource.create(billingDetails);
      return Right<ErrorClass, BillingDetailsEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, BillingDetailsEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, BillingDetailsEntity>(ApiError.badRequest());
    }
  }

  async deleteBillingDetails(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateBillingDetails(id: string, data: BillingDetailsModel): Promise<Either<ErrorClass, BillingDetailsEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, BillingDetailsEntity>(i);
    } catch {
      return Left<ErrorClass, BillingDetailsEntity>(ApiError.badRequest());
    }
  }

  async getBillingDetailss(): Promise<Either<ErrorClass, BillingDetailsEntity[]>> {
    // return await this.dataSource.getAllBillingDetailss();
    try {
      let i = await this.dataSource.getAllBillingDetailss();
      return Right<ErrorClass, BillingDetailsEntity[]>(i);
    } catch {
      return Left<ErrorClass, BillingDetailsEntity[]>(ApiError.badRequest());
    }
  }

  async getBillingDetailsById(id: string): Promise<Either<ErrorClass, BillingDetailsEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, BillingDetailsEntity | null>(i);
    } catch {
      return Left<ErrorClass, BillingDetailsEntity | null>(ApiError.badRequest());
    }
  }
}
