import {
  RequisitionEntity,
  RequisitionModel,
} from "@domain/requisition/entities/requisition";
import {RequisitionRepository } from "@domain/requisition/repositories/requistion-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateRequisitionUsecase {
  execute: (
    requisitionId: string,
    requisitionData: RequisitionModel
  ) => Promise<Either<ErrorClass, RequisitionEntity>>;
}

export class UpdateRequisition implements UpdateRequisitionUsecase {
  private readonly requisitionRepository: RequisitionRepository;

  constructor(requisitionRepository: RequisitionRepository) {
    this.requisitionRepository = requisitionRepository;
  }

  async execute(
    requisitionId: string,
    requisitionData: RequisitionModel
  ): Promise<Either<ErrorClass, RequisitionEntity>> {
    return await this.requisitionRepository.updateRequisition(
      requisitionId,
      requisitionData
    );
  }
}
