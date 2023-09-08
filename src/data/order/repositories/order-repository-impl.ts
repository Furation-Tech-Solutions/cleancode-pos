import { OrderModel, OrderEntity } from "@domain/order/entities/order";
import { OrderRepository } from "@domain/order/repositories/order-repository"; 
import { OrderDataSource } from "@data/order/datasource/order-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class OrderRepositoryImpl implements OrderRepository {
  private readonly dataSource: OrderDataSource;

  constructor(dataSource: OrderDataSource) {
    this.dataSource = dataSource;
  }

  async createOrder(order: OrderModel): Promise<Either<ErrorClass, OrderEntity>> {
    // return await this.dataSource.create(order);
    try {
      let i = await this.dataSource.create(order);
      return Right<ErrorClass, OrderEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, OrderEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, OrderEntity>(ApiError.badRequest());
    }
  }

  async deleteOrder(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateOrder(id: string, data: OrderModel): Promise<Either<ErrorClass, OrderEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, OrderEntity>(i);
    } catch {
      return Left<ErrorClass, OrderEntity>(ApiError.badRequest());
    }
  }

  async getOrders(): Promise<Either<ErrorClass, OrderEntity[]>> {
    // return await this.dataSource.getAllOrders();
    try {
      let i = await this.dataSource.getAllOrders();
      return Right<ErrorClass, OrderEntity[]>(i);
    } catch {
      return Left<ErrorClass, OrderEntity[]>(ApiError.badRequest());
    }
  }

  async getOrderById(id: string): Promise<Either<ErrorClass, OrderEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, OrderEntity | null>(i);
    } catch {
      return Left<ErrorClass, OrderEntity | null>(ApiError.badRequest());
    }
  }
}
