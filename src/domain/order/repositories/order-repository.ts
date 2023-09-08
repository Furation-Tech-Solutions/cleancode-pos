import { OrderModel, OrderEntity } from "@domain/order/entities/order";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface OrderRepository {
  createOrder(order: OrderModel): Promise<Either<ErrorClass, OrderEntity>>;
  deleteOrder(id: string): Promise<Either<ErrorClass, void>>;
  updateOrder(id: string, data: OrderModel): Promise<Either<ErrorClass, OrderEntity>>;
  getOrders(): Promise<Either<ErrorClass, OrderEntity[]>>;
  getOrderById(id: string): Promise<Either<ErrorClass, OrderEntity | null>>;
}

