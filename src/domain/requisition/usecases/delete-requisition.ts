import { RequisitionRepository } from "@domain/requisition/repositories/requistion-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteRequisitionUsecase {
  execute: (requisitionId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteRequisition implements DeleteRequisitionUsecase {
  private readonly requisitionRepository: RequisitionRepository;

  constructor(requisitionRepository: RequisitionRepository) {
    this.requisitionRepository = requisitionRepository;
  }

  async execute(requisitionId: string): Promise<Either<ErrorClass, void>> {
    return await this.requisitionRepository.deleteRequisition(requisitionId);
  }
}
