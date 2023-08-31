import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { VeriationsRepository } from "@domain/veriations/repositories/veriations-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateVeriationsUsecase {
  execute: (
    veriationsId: string,
    veriationsData: VeriationsModel
  ) => Promise<Either<ErrorClass, VeriationsEntity>>;
}

export class UpdateVeriations implements UpdateVeriationsUsecase {
  private readonly veriationsRepository: VeriationsRepository;

  constructor(veriationsRepository: VeriationsRepository) {
    this.veriationsRepository = veriationsRepository;
  }
  async execute(veriationsId: string, veriationsData: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>> {
   return await this.veriationsRepository.updateVeriations(veriationsId, veriationsData);
 }
}
