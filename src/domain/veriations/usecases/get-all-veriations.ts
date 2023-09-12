import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { VeriationsRepository } from "@domain/veriations/repositories/veriations-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllVeriationssUsecase {
  execute: () => Promise<Either<ErrorClass, VeriationsEntity[]>>;
}

export class GetAllVeriationss implements GetAllVeriationssUsecase {
  private readonly veriationsRepository: VeriationsRepository;

  constructor(veriationsRepository: VeriationsRepository) {
    this.veriationsRepository = veriationsRepository;
  }

  async execute(): Promise<Either<ErrorClass, VeriationsEntity[]>> {
    return await this.veriationsRepository.getVeriationss();
  }
}
