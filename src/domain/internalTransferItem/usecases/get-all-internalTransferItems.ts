import { InternalTransferItemEntity } from "@domain/internalTransferItem/entities/internalTransferItem";
import { InternalTransferItemRepository } from "@domain/internalTransferItem/repositories/internalTransferItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInternalTransferItemsUsecase {
  execute: () => Promise<Either<ErrorClass, InternalTransferItemEntity[]>>;
}

export class GetAllInternalTransferItems
  implements GetAllInternalTransferItemsUsecase
{
  private readonly internalTransferItemRepository: InternalTransferItemRepository;

  constructor(internalTransferItemRepository: InternalTransferItemRepository) {
    this.internalTransferItemRepository = internalTransferItemRepository;
  }

  async execute(): Promise<Either<ErrorClass, InternalTransferItemEntity[]>> {
    return await this.internalTransferItemRepository.getInternalTransferItems();
  }
}
