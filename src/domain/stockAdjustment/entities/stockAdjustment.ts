// Express API request populate the StockAdjustment Model
import { Date } from "mongoose";
export class StockAdjustmentModel {
    constructor(
      public outletStockId: string[] = [],
      public adjustmentType: string = "",
      public adjustmentDate: Date,
      public quantityChange: number = 0,
      public del_status: boolean

    ) {}
  }
  
  // StockAdjustment Entity provided by StockAdjustment Repository is converted to Express API Response
  export class StockAdjustmentEntity {
    constructor( 
      public id: string | undefined = undefined, // Set a default value for id
      public outletStockId: string[],
      public adjustmentType: string,
      public adjustmentDate: Date,
      public quantityChange: number,
      public del_status: boolean

      ) {}
  }
  
  
  export class StockAdjustmentMapper {
    static toEntity(
        stockAdjustmentData: any,
      includeId?: boolean,
      existingStockAdjustment?: StockAdjustmentEntity
    ): StockAdjustmentEntity {
      if (existingStockAdjustment != null) {
        // If existingStockAdjustment is provided, merge the data from stockAdjustmentData with the existingStockAdjustment
        return {
          ...existingStockAdjustment,
          outletStockId:
            stockAdjustmentData.outletStockId !==undefined ? stockAdjustmentData.outletStockId : existingStockAdjustment.outletStockId,
          adjustmentType:
            stockAdjustmentData.adjustmentType !== undefined? stockAdjustmentData.adjustmentType : existingStockAdjustment.adjustmentType,
          adjustmentDate:
            stockAdjustmentData.adjustmentDate !==undefined ? stockAdjustmentData.adjustmentDate : existingStockAdjustment.adjustmentDate,
          quantityChange:
            stockAdjustmentData.quantityChange !== undefined? stockAdjustmentData.quantityChange: existingStockAdjustment.quantityChange,
          del_status:
            stockAdjustmentData.del_status !==undefined ? stockAdjustmentData.del_status : existingStockAdjustment.del_status,
        };
      } else {
        // If existingStockAdjustment is not provided, create a new stockAdjustmentEntity using stockAdjustmentData
        const stockAdjustmentEntity: StockAdjustmentEntity = {
            id: includeId ? (stockAdjustmentData._id ? stockAdjustmentData._id.toString() : undefined) : stockAdjustmentData._id.toString(),
            outletStockId: stockAdjustmentData.outletStockId,
            adjustmentType: stockAdjustmentData.adjustmentType,
            adjustmentDate: stockAdjustmentData.adjustmentDate,
            quantityChange: stockAdjustmentData.quantityChange,
            del_status: stockAdjustmentData.del_status,
        };
        return stockAdjustmentEntity;
      }
    }
    static toModel(stockAdjustment: StockAdjustmentEntity): any {
      return {
        id: stockAdjustment.id,
        outletStockId: stockAdjustment.outletStockId,
        adjustmentType: stockAdjustment.adjustmentType,
        adjustmentDate: stockAdjustment.adjustmentDate,
        quantityChange: stockAdjustment.quantityChange,
        del_status: stockAdjustment.del_status, 
      };
    }
  }
  