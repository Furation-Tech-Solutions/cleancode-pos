import { InternalTransferEntity } from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInternalTransferByIdUsecase {
  execute: (
    internalTransferId: string
  ) => Promise<Either<ErrorClass, InternalTransferEntity>>;
}

export class GetInternalTransferById implements GetInternalTransferByIdUsecase {
  private readonly internalTransferRepository: InternalTransferRepository;

  constructor(internalTransferRepository: InternalTransferRepository) {
    this.internalTransferRepository = internalTransferRepository;
  }

  async execute(
    internalTransferId: string
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    return await this.internalTransferRepository.getInternalTransferById(
      internalTransferId
    );
  }
}
