import { InternalTransferEntity } from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInternalTransfersUsecase {
  execute: () => Promise<Either<ErrorClass, InternalTransferEntity[]>>;
}

export class GetAllInternalTransfers implements GetAllInternalTransfersUsecase {
  private readonly internalTransferRepository: InternalTransferRepository;

  constructor(internalTransferRepository: InternalTransferRepository) {
    this.internalTransferRepository = internalTransferRepository;
  }

  async execute(): Promise<Either<ErrorClass, InternalTransferEntity[]>> {
    return await this.internalTransferRepository.getInternalTransfers();
  }
}
