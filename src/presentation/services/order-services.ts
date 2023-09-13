import { NextFunction, Request, Response } from "express";
import {
  OrderModel,
  OrderEntity,
  OrderMapper,
} from "@domain/order/entities/order";
import { CreateOrderUsecase } from "@domain/order/usecases/create-order";
import { DeleteOrderUsecase } from "@domain/order/usecases/delete-order";
import { GetOrderByIdUsecase } from "@domain/order/usecases/get-order-by-id";
import { UpdateOrderUsecase } from "@domain/order/usecases/update-order";
import { GetAllOrdersUsecase } from "@domain/order/usecases/get-all-orders";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { AutoOrderNumber } from "@presentation/middlewares/order/orderNumber";

export class OrderService {
  private readonly createOrderUsecase: CreateOrderUsecase;
  private readonly deleteOrderUsecase: DeleteOrderUsecase;
  private readonly getOrderByIdUsecase: GetOrderByIdUsecase;
  private readonly updateOrderUsecase: UpdateOrderUsecase;
  private readonly getAllOrdersUsecase: GetAllOrdersUsecase;

  constructor(
    createOrderUsecase: CreateOrderUsecase,
    deleteOrderUsecase: DeleteOrderUsecase,
    getOrderByIdUsecase: GetOrderByIdUsecase,
    updateOrderUsecase: UpdateOrderUsecase,
    getAllOrdersUsecase: GetAllOrdersUsecase
  ) {
    this.createOrderUsecase = createOrderUsecase;
    this.deleteOrderUsecase = deleteOrderUsecase;
    this.getOrderByIdUsecase = getOrderByIdUsecase;
    this.updateOrderUsecase = updateOrderUsecase;
    this.getAllOrdersUsecase = getAllOrdersUsecase;
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    // Generate the order number as a string
    const orderNumber: string = AutoOrderNumber.generateNumberOrder(0);
  
    // Ensure req.body exists and create an 'order' property
    req.body = req.body || {};
    req.body.orderNumber = orderNumber;
  
    // Extract order data from the request body and convert it to OrderModel
    const orderData: OrderModel = OrderMapper.toModel(req.body);
  
    // Call the createOrderUsecase to create the order
    const newOrder: Either<ErrorClass, OrderEntity> = await this.createOrderUsecase.execute(orderData);
  
    newOrder.cata(
      (error: ErrorClass) => {
        // Handle the error using status and message from the error object
        res.status(error.status).json({ error: error.message });
      },
      (result: OrderEntity) => {
        // Map the result to response data
        const responseData = OrderMapper.toEntity(result, true);
        res.json(responseData);
      }
    );
  }
  
  
  
  
  
  

  async deleteOrder(req: Request, res: Response): Promise<void> {
    
      const orderId: string = req.params.orderId;

      const updatedOrderEntity: OrderEntity = OrderMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateOrderUsecase to update the Order
      const updatedOrder: Either<ErrorClass, OrderEntity> = await this.updateOrderUsecase.execute(
        orderId,
        updatedOrderEntity
      );

      updatedOrder.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OrderEntity) =>{
          const responseData = OrderMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
      const orderId: string = req.params.orderId;

      // Call the GetOrderByIdUsecase to get the order by ID
      const order: Either<ErrorClass, OrderEntity | null> = await this.getOrderByIdUsecase.execute(
        orderId
      );

      order.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OrderEntity | null) =>{
          const responseData = OrderMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    
      const orderId: string = req.params.orderId;
      const orderData: OrderModel = req.body;

      // Get the existing Order by ID
      const existingOrder: Either<ErrorClass, OrderEntity | null> =
        await this.getOrderByIdUsecase.execute(orderId);

      if (!existingOrder) {
        // If order is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert orderfData from OrderModel to OrderEntity using OrderMapper
      const updatedOrderEntity: OrderEntity = OrderMapper.toEntity(
        orderData,
        true,
      );

      // Call the UpdateOrderUsecase to update the Order
      const updatedOrder: Either<ErrorClass, OrderEntity> = await this.updateOrderUsecase.execute(
        orderId,
        updatedOrderEntity
      );

      updatedOrder.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OrderEntity) =>{
          const responseData = OrderMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllOrdersUsecase to get all Orders
      const orders: Either<ErrorClass, OrderEntity[]> = await this.getAllOrdersUsecase.execute();

      orders.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: OrderEntity[]) => {
            // Filter out orders with del_status set to "Deleted"
            const nonDeletedOrders = result.filter((order) => order.del_status !== false);

            // Convert non-deleted orders from an array of OrderEntity to an array of plain JSON objects using OrderMapper
            const responseData = nonDeletedOrders.map((order) => OrderMapper.toEntity(order));
            return res.json(responseData);
        }
    );
  }
}
