import { RequisitionEntity } from "@domain/requisition/entities/requisition";
import { RequisitionRepository } from "@domain/requisition/repositories/requistion-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetRequisitionByIdUsecase {
  execute: (
    requisitionId: string
  ) => Promise<Either<ErrorClass, RequisitionEntity>>;
}

export class GetRequisitionById implements GetRequisitionByIdUsecase {
  private readonly requisitionRepository: RequisitionRepository;

  constructor(requisitionRepository: RequisitionRepository) {
    this.requisitionRepository = requisitionRepository;
  }

  async execute(
    requisitionId: string
  ): Promise<Either<ErrorClass, RequisitionEntity>> {
    return await this.requisitionRepository.getRequisitionById(requisitionId);
  }
}
