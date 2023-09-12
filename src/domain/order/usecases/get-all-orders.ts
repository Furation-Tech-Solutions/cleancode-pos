import { OrderModel, OrderEntity } from "@domain/order/entities/order";
import { OrderRepository } from "@domain/order/repositories/order-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllOrdersUsecase {
  execute: () => Promise<Either<ErrorClass, OrderEntity[]>>;
}

export class GetAllOrders implements GetAllOrdersUsecase {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(): Promise<Either<ErrorClass, OrderEntity[]>> {
    return await this.orderRepository.getOrders();
  }
}
