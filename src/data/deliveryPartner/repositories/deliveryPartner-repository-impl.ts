import { DeliveryPartnerModel, DeliveryPartnerEntity } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartnerRepository } from "@domain/deliveryPartner/repositories/deliveryPartner-repository";
import { DeliveryPartnerDataSource } from "@data/deliveryPartner/datasources/deliveryPartner-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class DeliveryPartnerRepositoryImpl implements DeliveryPartnerRepository {
  private readonly dataSource: DeliveryPartnerDataSource;

  constructor(dataSource: DeliveryPartnerDataSource) {
    this.dataSource = dataSource;
  }

  async createDeliveryPartner(deliveryPartner: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>> {
    // return await this.dataSource.create(DeliveryPartner);
    try {
      let i = await this.dataSource.create(deliveryPartner);
      return Right<ErrorClass, DeliveryPartnerEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "conflict"){
        return Left<ErrorClass, DeliveryPartnerEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, DeliveryPartnerEntity>(ApiError.badRequest());
    }
  }

  async deleteDeliveryPartner(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateDeliveryPartner(id: string, data: DeliveryPartnerModel): Promise<Either<ErrorClass, DeliveryPartnerEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, DeliveryPartnerEntity>(i);
    } catch {
      return Left<ErrorClass, DeliveryPartnerEntity>(ApiError.badRequest());
    }
  }

  async getDeliveryPartners(): Promise<Either<ErrorClass, DeliveryPartnerEntity[]>> {
    // return await this.dataSource.getAllDeliveryPartners();
    try {
      let i = await this.dataSource.getAllDeliveryPartners();
      return Right<ErrorClass, DeliveryPartnerEntity[]>(i);
    } catch {
      return Left<ErrorClass, DeliveryPartnerEntity[]>(ApiError.badRequest());
    }
  }

  async getDeliveryPartnerById(id: string): Promise<Either<ErrorClass, DeliveryPartnerEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, DeliveryPartnerEntity | null>(i);
    } catch {
      return Left<ErrorClass, DeliveryPartnerEntity | null>(ApiError.badRequest());
    }
  }
}
