import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInternalTransferUsecase {
  execute: (internalTransferId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInternalTransfer implements DeleteInternalTransferUsecase {
  private readonly internalTransferRepository: InternalTransferRepository;

  constructor(internalTransferRepository: InternalTransferRepository) {
    this.internalTransferRepository = internalTransferRepository;
  }

  async execute(internalTransferId: string): Promise<Either<ErrorClass, void>> {
    return await this.internalTransferRepository.deleteInternalTransfer(
      internalTransferId
    );
  }
}
