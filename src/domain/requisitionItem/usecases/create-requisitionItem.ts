import {
  RequisitionItemEntity,
  RequisitionItemModel,
} from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateRequisitionItemUsecase {
  execute: (
    requisitionItemData: RequisitionItemModel
  ) => Promise<Either<ErrorClass, RequisitionItemEntity>>;
}

export class CreateRequisitionItem implements CreateRequisitionItemUsecase {
  private readonly requisitionItemRepository: RequisitionItemRepository;

  constructor(requisitionItemRepository: RequisitionItemRepository) {
    this.requisitionItemRepository = requisitionItemRepository;
  }

  async execute(
    requisitionItemData: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    return await this.requisitionItemRepository.createRequisitionItem(
      requisitionItemData
    );
  }
}
