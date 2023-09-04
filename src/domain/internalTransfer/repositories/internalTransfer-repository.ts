import {
  InternalTransferEntity,
  InternalTransferModel,
} from "@domain/internalTransfer/entities/internalTransfer";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InternalTransferRepository {
  createInternalTransfer(
    internalTransfer: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>>;
  getInternalTransfers(): Promise<Either<ErrorClass, InternalTransferEntity[]>>;
  getInternalTransferById(
    id: string
  ): Promise<Either<ErrorClass, InternalTransferEntity>>;
  updateInternalTransfer(
    id: string,
    data: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>>;
  deleteInternalTransfer(id: string): Promise<Either<ErrorClass, void>>;
}
