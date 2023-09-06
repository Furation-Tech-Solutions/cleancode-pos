import {type OrderRepository } from "@domain/order/repositories/order-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteOrderUsecase {
  execute: (orderId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteOrder implements DeleteOrderUsecase {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId: string): Promise<Either<ErrorClass, void>> {
    return await this.orderRepository.deleteOrder(orderId);
  }
}
