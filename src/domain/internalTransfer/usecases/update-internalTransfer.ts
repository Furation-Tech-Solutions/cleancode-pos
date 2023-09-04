import {
  InternalTransferEntity,
  InternalTransferModel,
} from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateInternalTransferUsecase {
  execute: (
    internalTransferId: string,
    internalTransferData: InternalTransferModel
  ) => Promise<Either<ErrorClass, InternalTransferEntity>>;
}

export class UpdateInternalTransfer implements UpdateInternalTransferUsecase {
  private readonly internalTransferRepository: InternalTransferRepository;

  constructor(internalTransferRepository: InternalTransferRepository) {
    this.internalTransferRepository = internalTransferRepository;
  }

  async execute(
    internalTransferId: string,
    internalTransferData: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    return await this.internalTransferRepository.updateInternalTransfer(
      internalTransferId,
      internalTransferData
    );
  }
}
