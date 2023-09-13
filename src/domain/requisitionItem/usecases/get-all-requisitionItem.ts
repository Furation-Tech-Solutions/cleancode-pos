import { RequisitionItemEntity } from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllRequisitionItemsUsecase {
  execute: () => Promise<Either<ErrorClass, RequisitionItemEntity[]>>;
}

export class GetAllRequisitionItems implements GetAllRequisitionItemsUsecase {
  private readonly requisitionItemRepository: RequisitionItemRepository;

  constructor(requisitionItemRepository: RequisitionItemRepository) {
    this.requisitionItemRepository = requisitionItemRepository;
  }

  async execute(): Promise<Either<ErrorClass, RequisitionItemEntity[]>> {
    return await this.requisitionItemRepository.getRequisitionItems();
  }
}
