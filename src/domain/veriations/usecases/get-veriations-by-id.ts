import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { VeriationsRepository } from "@domain/veriations/repositories/veriations-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetVeriationsByIdUsecase {
  execute: (veriationsId: string) => Promise<Either<ErrorClass, VeriationsEntity | null>>;
}

export class GetVeriationsById implements GetVeriationsByIdUsecase {
  private readonly veriationsRepository: VeriationsRepository;

  constructor(veriationsRepository: VeriationsRepository) {
    this.veriationsRepository = veriationsRepository;
  }

  async execute(veriationsId: string): Promise<Either<ErrorClass, VeriationsEntity | null>> {
    return await this.veriationsRepository.getVeriationsById(veriationsId);
  }
}
