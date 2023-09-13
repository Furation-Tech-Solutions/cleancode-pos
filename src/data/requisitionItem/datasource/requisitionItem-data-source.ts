import {
  RequisitionItemEntity,
  RequisitionItemModel,
} from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItem } from "@data/requisitionItem/models/requisitionItem-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface RequisitionItemDataSource {
  create(requisitionItem: RequisitionItemModel): Promise<RequisitionItemEntity>;
  getById(id: string): Promise<RequisitionItemEntity | null>;
  getAllRequisitionItems(): Promise<RequisitionItemEntity[]>;
  update(id: string, requisitionItem: RequisitionItemModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class RequisitionItemDataSourceImpl implements RequisitionItemDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(
    requisitionItem: RequisitionItemModel
  ): Promise<RequisitionItemEntity> {
    const requisitionItemData = new RequisitionItem(requisitionItem);

    const createdRequisitionItem = await requisitionItemData.save();

    return createdRequisitionItem.toObject();
  }

  async getById(id: string): Promise<RequisitionItemEntity | null> {
    const requisitionItem = await RequisitionItem.findById(id);
    return requisitionItem ? requisitionItem.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllRequisitionItems(): Promise<RequisitionItemEntity[]> {
    try {
      const requisitionItems = await RequisitionItem.find();
      return requisitionItems.map((requisitionItems: mongoose.Document) =>
        requisitionItems.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(
    id: string,
    requisitionItem: RequisitionItemModel
  ): Promise<any> {
    try {
      const updatedRequisitionItem = await RequisitionItem.findByIdAndUpdate(
        id,
        requisitionItem,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedRequisitionItem ? updatedRequisitionItem.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await RequisitionItem.findByIdAndDelete(id);
  }
}
