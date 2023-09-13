import { InternalTransferItemEntity } from "@domain/internalTransferItem/entities/internalTransferItem";
import { InternalTransferItemRepository } from "@domain/internalTransferItem/repositories/internalTransferItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInternalTransferItemByIdUsecase {
  execute: (
    internalTransferItemId: string
  ) => Promise<Either<ErrorClass, InternalTransferItemEntity>>;
}

export class GetInternalTransferItemById
  implements GetInternalTransferItemByIdUsecase
{
  private readonly internalTransferItemRepository: InternalTransferItemRepository;

  constructor(internalTransferItemRepository: InternalTransferItemRepository) {
    this.internalTransferItemRepository = internalTransferItemRepository;
  }

  async execute(
    internalTransferItemId: string
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>> {
    return await this.internalTransferItemRepository.getInternalTransferItemById(
      internalTransferItemId
    );
  }
}
