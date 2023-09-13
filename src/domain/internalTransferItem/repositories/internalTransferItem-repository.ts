import {
  InternalTransferItemEntity,
  InternalTransferItemModel,
} from "@domain/internalTransferItem/entities/internalTransferItem";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InternalTransferItemRepository {
  createInternalTransferItem(
    internalTransferItem: InternalTransferItemModel
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>>;
  getInternalTransferItems(): Promise<
    Either<ErrorClass, InternalTransferItemEntity[]>
  >;
  getInternalTransferItemById(
    id: string
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>>;
  updateInternalTransferItem(
    id: string,
    data: InternalTransferItemModel
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>>;
  deleteInternalTransferItem(id: string): Promise<Either<ErrorClass, void>>;
}
