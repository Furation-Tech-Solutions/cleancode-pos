import { InternalTransferItemRepository } from "@domain/internalTransferItem/repositories/internalTransferItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInternalTransferItemUsecase {
  execute: (
    internalTransferItemId: string
  ) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInternalTransferItem implements DeleteInternalTransferItemUsecase {
  private readonly internalTransferItemRepository: InternalTransferItemRepository;

  constructor(internalTransferItemRepository: InternalTransferItemRepository) {
    this.internalTransferItemRepository = internalTransferItemRepository;
  }

  async execute(
    internalTransferItemId: string
  ): Promise<Either<ErrorClass, void>> {
    return await this.internalTransferItemRepository.deleteInternalTransferItem(
      internalTransferItemId
    );
  }
}
