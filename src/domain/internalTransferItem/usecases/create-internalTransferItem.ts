import {
  InternalTransferItemEntity,
  InternalTransferItemModel,
} from "@domain/internalTransferItem/entities/internalTransferItem";
import { InternalTransferItemRepository } from "@domain/internalTransferItem/repositories/internalTransferItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInternalTransferItemUsecase {
  execute: (
    internalTransferItemData: InternalTransferItemModel
  ) => Promise<Either<ErrorClass, InternalTransferItemEntity>>;
}

export class CreateInternalTransferItem implements CreateInternalTransferItemUsecase {
  private readonly internalTransferItemRepository: InternalTransferItemRepository;

  constructor(internalTransferItemRepository: InternalTransferItemRepository) {
    this.internalTransferItemRepository = internalTransferItemRepository;
  }

  async execute(
    internalTransferItemData: InternalTransferItemModel
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>> {
    return await this.internalTransferItemRepository.createInternalTransferItem(
      internalTransferItemData
    );
  }
}
