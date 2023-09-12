import {
  InternalTransferItemEntity,
  InternalTransferItemModel,
} from "@domain/internalTransferItem/entities/internalTransferItem";
import { InternalTransferItem } from "@data/internalTransferItem/models/internalTransferItem-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InternalTransferItemDataSource {
  create(
    internalTransferItem: InternalTransferItemModel
  ): Promise<InternalTransferItemEntity>;
  getById(id: string): Promise<InternalTransferItemEntity | null>;
  getAllInternalTransferItems(): Promise<InternalTransferItemEntity[]>;
  update(
    id: string,
    internalTransferItem: InternalTransferItemModel
  ): Promise<any>;
  delete(id: string): Promise<void>;
}

export class InternalTransferItemDataSourceImpl
  implements InternalTransferItemDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(
    internalTransferItem: InternalTransferItemModel
  ): Promise<InternalTransferItemEntity> {
    const internalTransferItemData = new InternalTransferItem(
      internalTransferItem
    );

    const createdInternalTransferItem = await internalTransferItemData.save();
    return createdInternalTransferItem.toObject();
  }

  async getById(id: string): Promise<InternalTransferItemEntity | null> {
    const internalTransferItem = await InternalTransferItem.findById(id);

    return internalTransferItem ? internalTransferItem.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInternalTransferItems(): Promise<InternalTransferItemEntity[]> {
    try {
      const internalTransferItems = await InternalTransferItem.find();
      return internalTransferItems.map(
        (internalTransferItem: mongoose.Document) =>
          internalTransferItem.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(
    id: string,
    internalTransferItem: InternalTransferItemModel
  ): Promise<any> {
    try {
      const updatedInternalTransferItem =
        await InternalTransferItem.findByIdAndUpdate(id, internalTransferItem, {
          new: true,
        }); // No need for conversion here
      return updatedInternalTransferItem
        ? updatedInternalTransferItem.toObject()
        : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await InternalTransferItem.findByIdAndDelete(id);
  }
}
