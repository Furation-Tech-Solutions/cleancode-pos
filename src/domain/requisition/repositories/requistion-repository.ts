import {
  RequisitionModel,
  RequisitionEntity,
} from "@domain/requisition/entities/requisition";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface RequisitionRepository {
  getRequisitions(): Promise<Either<ErrorClass, RequisitionEntity[]>>;
  getRequisitionById(
    id: string
  ): Promise<Either<ErrorClass, RequisitionEntity>>;
  updateRequisition(
    id: string,
    data: RequisitionModel
  ): Promise<Either<ErrorClass, RequisitionEntity>>;
}
