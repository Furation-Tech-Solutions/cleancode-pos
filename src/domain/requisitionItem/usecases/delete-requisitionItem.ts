import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteRequisitionItemUsecase {
  execute: (requisitionItemId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteRequisitionItem implements DeleteRequisitionItemUsecase {
  private readonly requisitionItemRepository: RequisitionItemRepository;

  constructor(requisitionItemRepository: RequisitionItemRepository) {
    this.requisitionItemRepository = requisitionItemRepository;
  }

  async execute(requisitionItemId: string): Promise<Either<ErrorClass, void>> {
    return await this.requisitionItemRepository.deleteRequisitionItem(
      requisitionItemId
    );
  }
}
