import { OrderModel, OrderEntity } from "@domain/order/entities/order";
import { OrderRepository } from "@domain/order/repositories/order-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetOrderByIdUsecase {
  execute: (orderId: string) => Promise<Either<ErrorClass, OrderEntity | null>>;
}

export class GetOrderById implements GetOrderByIdUsecase {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId: string): Promise<Either<ErrorClass, OrderEntity | null>> {
    return await this.orderRepository.getOrderById(orderId);
  }
}
