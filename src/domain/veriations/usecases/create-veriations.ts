import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { VeriationsRepository } from "@domain/veriations/repositories/veriations-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateVeriationsUsecase {
  execute: (veriationsData: VeriationsModel) => Promise<Either<ErrorClass, VeriationsEntity>>;
}

export class CreateVeriations implements CreateVeriationsUsecase {
  private readonly veriationsRepository: VeriationsRepository;

  constructor(veriationsRepository: VeriationsRepository) {
    this.veriationsRepository = veriationsRepository;
  }

  async execute(veriationsData: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>> {
    return await this.veriationsRepository.createVeriations(veriationsData);
  }
}
