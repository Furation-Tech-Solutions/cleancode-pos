import { RequisitionItemEntity } from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetRequisitionItemByIdUsecase {
  execute: (
    requisitionItemId: string
  ) => Promise<Either<ErrorClass, RequisitionItemEntity>>;
}

export class GetRequisitionItemById implements GetRequisitionItemByIdUsecase {
  private readonly requisitionItemRepository: RequisitionItemRepository;

  constructor(requisitionItemRepository: RequisitionItemRepository) {
    this.requisitionItemRepository = requisitionItemRepository;
  }

  async execute(
    requisitionItemId: string
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    return await this.requisitionItemRepository.getRequisitionItemById(
      requisitionItemId
    );
  }
}
