import {
  RequisitionEntity,
  RequisitionModel,
} from "@domain/requisition/entities/requisition";
import { Requisition } from "@data/requisition/models/requisition-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface RequisitionDataSource {
  getById(id: string): Promise<RequisitionEntity | null>;
  getAllRequisitions(): Promise<RequisitionEntity[]>;
  update(id: string, requisition: RequisitionModel): Promise<any>;
}

export class RequisitionDataSourceImpl implements RequisitionDataSource {
  constructor(private db: mongoose.Connection) {}

  async getById(id: string): Promise<RequisitionEntity | null> {
    const requisition = await Requisition.findById(id);
    return requisition ? requisition.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllRequisitions(): Promise<RequisitionEntity[]> {
    try {
      const requisitions = await Requisition.find();
      return requisitions.map((requisitions: mongoose.Document) =>
        requisitions.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, requisition: RequisitionModel): Promise<any> {
    try {
      const updatedRequisition = await Requisition.findByIdAndUpdate(
        id,
        requisition,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedRequisition ? updatedRequisition.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }
}
