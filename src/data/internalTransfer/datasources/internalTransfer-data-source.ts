import {
  InternalTransferEntity,
  InternalTransferModel,
} from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransfer } from "@data/internalTransfer/models/internalTransfer-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InternalTransferDataSource {
  create(
    internalTransfer: InternalTransferModel
  ): Promise<InternalTransferEntity>;
  getById(id: string): Promise<InternalTransferEntity | null>;
  getAllInternalTransfers(): Promise<InternalTransferEntity[]>;
  update(id: string, internalTransfer: InternalTransferModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class InternalTransferDataSourceImpl implements InternalTransferDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(
    internalTransfer: InternalTransferModel
  ): Promise<InternalTransferEntity> {
    const internalTransferData = new InternalTransfer(internalTransfer);

    const createdInternalTransfer = await internalTransferData.save();
    return createdInternalTransfer.toObject();
  }

  async getById(id: string): Promise<InternalTransferEntity | null> {
    const internalTransfer = await InternalTransfer.findById(id);
    
    return internalTransfer ? internalTransfer.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInternalTransfers(): Promise<InternalTransferEntity[]> {
    try {
      const internalTransfers = await InternalTransfer.find();
      return internalTransfers.map((internalTransfer: mongoose.Document) =>
        internalTransfer.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(
    id: string,
    internalTransfer: InternalTransferModel
  ): Promise<any> {
    try {
      const updatedInternalTransfer = await InternalTransfer.findByIdAndUpdate(
        id,
        internalTransfer,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedInternalTransfer
        ? updatedInternalTransfer.toObject()
        : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await InternalTransfer.findByIdAndDelete(id);
  }
}
