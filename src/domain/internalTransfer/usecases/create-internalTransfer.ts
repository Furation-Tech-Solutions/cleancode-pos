import {
  InternalTransferEntity,
  InternalTransferModel,
} from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInternalTransferUsecase {
  execute: (
    internalTransferData: InternalTransferModel
  ) => Promise<Either<ErrorClass, InternalTransferEntity>>;
}

export class CreateInternalTransfer implements CreateInternalTransferUsecase {
  private readonly internalTransferRepository: InternalTransferRepository;

  constructor(internalTransferRepository: InternalTransferRepository) {
    this.internalTransferRepository = internalTransferRepository;
  }

  async execute(
    internalTransferData: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    return await this.internalTransferRepository.createInternalTransfer(
      internalTransferData
    );
  }
}
