import { OrderModel, OrderEntity } from "@domain/order/entities/order";
import { OrderRepository } from "@domain/order/repositories/order-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateOrderUsecase {
  execute: (orderData: OrderModel) => Promise<Either<ErrorClass, OrderEntity>>;
}

export class CreateOrder implements CreateOrderUsecase {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData: OrderModel): Promise<Either<ErrorClass, OrderEntity>> {
    return await this.orderRepository.createOrder(orderData);
  }
}
