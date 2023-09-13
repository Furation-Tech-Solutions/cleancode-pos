import { Date } from "mongoose";

// Express API request populate the order Model
export class OrderModel {
  constructor(
    public orderNumber: string = "",
    public date: Date,
    public persons: string = "",
    public waiter: string = "",
    public orderTime: Date,
    public orderType: string = "",
    public orderTable: string[] = [],
    public kot_print: string[] = [],
    public total_order_price:number = 0,
    public order_status: string = "",
    public del_status: boolean
  ) { }
}

// order Entity provided by order Repository is converted to Express API Response
export class OrderEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public orderNumber: string,
    public date: Date,
    public persons: string,
    public waiter: string,
    public orderTime: Date,
    public orderType: string,
    public orderTable: string[],
    public kot_print: string[],
    public total_order_price:number,
    public order_status: string,
    public del_status: boolean
  ) { }
}


export class OrderMapper {
  static toEntity(
    orderData: any,
    includeId?: boolean,
    existingOrder?: OrderEntity | null
  ): OrderEntity {
    if (existingOrder != null) {
      // If existingOrder is provided, merge the data from orderData with the existingOrder
      return {
        ...existingOrder,
        orderNumber:
          orderData.orderNumber !== undefined ? orderData.orderNumber : existingOrder.orderNumber,
        date:
          orderData.date !== undefined ? orderData.date : existingOrder.date,
        persons:
          orderData.persons !== undefined ? orderData.persons : existingOrder.persons,
        waiter:
          orderData.waiter !== undefined ? orderData.waiter : existingOrder.waiter,
        orderTime:
          orderData.orderTime !== undefined ? orderData.orderTime : existingOrder.orderTime,
        orderType:
          orderData.orderType !== undefined ? orderData.orderType : existingOrder.orderType,
        orderTable:
          orderData.orderTable !== undefined ? orderData.orderTable : existingOrder.orderTable,
        kot_print:
          orderData.kot_print !== undefined ? orderData.kot_print : existingOrder.kot_print,
        total_order_price:
          orderData.total_order_price !== undefined ? orderData.total_order_price : existingOrder.total_order_price,
        order_status:
          orderData.order_status !== undefined ? orderData.order_status : existingOrder.order_status,
        del_status:
          orderData.del_status !== undefined ? orderData.del_status : existingOrder.del_status
      };
    } else {
      // If existingOrder is not provided, create a new OrderEntity using orderData
      const OrderEntity: OrderEntity = {
        id: includeId ? (orderData._id ? orderData._id.toString() : undefined) : orderData._id.toString(),
        orderNumber: orderData.orderNumber,
        date: orderData.date,
        persons: orderData.persons,
        waiter: orderData.waiter,
        orderTime: orderData.orderTime,
        orderType: orderData.orderType,
        orderTable: orderData.orderTable,
        kot_print: orderData.kot_print,
        total_order_price: orderData.total_order_price,
        order_status: orderData.order_status,
        del_status: orderData.del_status
      };
      return OrderEntity;
    }
  }

  static toModel(order: OrderEntity): OrderModel {
    return {
      orderNumber: order.orderNumber,
      date: order.date,
      persons: order.persons,
      waiter: order.waiter,
      orderTime: order.orderTime,
      orderType: order.orderType,
      orderTable: order.orderTable,
      kot_print: order.kot_print,
      total_order_price: order.total_order_price,
      order_status: order.order_status,
      del_status: order.del_status
    };
  }
}
