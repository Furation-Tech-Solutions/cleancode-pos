import {
  RequisitionItemEntity,
  RequisitionItemModel,
} from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateRequisitionItemUsecase {
  execute: (
    requisitionItemId: string,
    requisitionItemData: RequisitionItemModel
  ) => Promise<Either<ErrorClass, RequisitionItemEntity>>;
}

export class UpdateRequisitionItem implements UpdateRequisitionItemUsecase {
  private readonly requisitionItemRepository: RequisitionItemRepository;

  constructor(requisitionItemRepository: RequisitionItemRepository) {
    this.requisitionItemRepository = requisitionItemRepository;
  }

  async execute(
    requisitionItemId: string,
    requisitionItemData: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    return await this.requisitionItemRepository.updateRequisitionItem(
      requisitionItemId,
      requisitionItemData
    );
  }
}
