import {
  RequisitionItemModel,
  RequisitionItemEntity,
} from "@domain/requisitionItem/entities/requisitionItem";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface RequisitionItemRepository {
  createRequisitionItem(
    requisitionItem: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>>;
  deleteRequisitionItem(id: string): Promise<Either<ErrorClass, void>>;
  getRequisitionItems(): Promise<Either<ErrorClass, RequisitionItemEntity[]>>;
  getRequisitionItemById(
    id: string
  ): Promise<Either<ErrorClass, RequisitionItemEntity>>;
  updateRequisitionItem(
    id: string,
    data: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>>;
}
