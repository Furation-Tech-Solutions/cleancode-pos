import { OrderModel } from "@domain/order/entities/order";
import { Order } from "../models/order-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface OrderDataSource {
  create(order: OrderModel): Promise<any>; // Return type should be Promise of OrderEntity
  update(id: string, order: OrderModel): Promise<any>; // Return type should be Promise of OrderEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of OrderEntity or null
  getAllOrders(): Promise<any[]>; // Return type should be Promise of an array of OrderEntity
}

export class OrderDataSourceImpl implements OrderDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(order: OrderModel): Promise<any> {

    // const existingOrder = await Order.findOne({ name: order.name });
    // if (existingOrder) {
    //   throw ApiError.orderExists()
    // }

    const orderData = new Order(order);

    const createdOrder = await orderData.save();

    return createdOrder.toObject();
  }

  async update(id: string, order: OrderModel): Promise<any> {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
    }); // No need for conversion here
    return updatedOrder ? updatedOrder.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Order.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const order = await Order.findById(id);
    return order ? order.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllOrders(): Promise<any[]> {
    const orders = await Order.find();
    return orders.map((order) => order.toObject());
  }
}

