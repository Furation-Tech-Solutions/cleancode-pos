// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { OrderService } from "@presentation/services/order-services";
import { OrderDataSourceImpl } from "@data/order/datasource/order-data-source";
import { OrderRepositoryImpl } from "@data/order/repositories/order-repository-impl";
import { CreateOrder } from "@domain/order/usecases/create-order";
import { DeleteOrder } from "@domain/order/usecases/delete-order";
import { GetOrderById } from "@domain/order/usecases/get-order-by-id";
import { GetAllOrders } from "@domain/order/usecases/get-all-orders";
import { UpdateOrder } from "@domain/order/usecases/update-order";
import validateOrderMiddleware from "@presentation/middlewares/order/validation-middleware";

// Create an instance of the OrderDataSourceImpl and pass the mongoose connection
const orderDataSource = new OrderDataSourceImpl(mongoose.connection);

// Create an instance of the OrderRepositoryImpl and pass the OrderDataSourceImpl
const orderRepository = new OrderRepositoryImpl(orderDataSource);

// Create instances of the required use cases and pass the OrderRepositoryImpl
const createOrderUsecase = new CreateOrder(orderRepository);
const deleteOrderUsecase = new DeleteOrder(orderRepository);
const getOrderByIdUsecase = new GetOrderById(orderRepository);
const updateOrderUsecase = new UpdateOrder(orderRepository);
const getAllOrdersUsecase = new GetAllOrders(orderRepository);

// Initialize OrderService and inject required dependencies
const orderService = new OrderService(
  createOrderUsecase,
  deleteOrderUsecase,
  getOrderByIdUsecase,
  updateOrderUsecase,
  getAllOrdersUsecase
);

// Create an Express router
export const orderRouter = Router();

// Route handling for creating a new order
orderRouter.post("/new", validateOrderMiddleware, orderService.createOrder.bind(orderService));

// Route handling for getting an order by ID
orderRouter.get("/show/:orderId", orderService.getOrderById.bind(orderService));

// Route handling for updating an order by ID
orderRouter.put("/update/:orderId", orderService.updateOrder.bind(orderService));

// Route handling for deleting an order by ID
orderRouter.delete("/delete/:orderId", orderService.deleteOrder.bind(orderService));

// Route handling for getting all orders
orderRouter.get("/list", orderService.getAllOrders.bind(orderService));
