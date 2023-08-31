import {type VeriationsRepository } from "@domain/veriations/repositories/veriations-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteVeriationsUsecase {
  execute: (veriationsId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteVeriations implements DeleteVeriationsUsecase {
  private readonly veriationsRepository: VeriationsRepository;

  constructor(veriationsRepository: VeriationsRepository) {
    this.veriationsRepository = veriationsRepository;
  }

  async execute(veriationsId: string): Promise<Either<ErrorClass, void>> {
    return await this.veriationsRepository.deleteVeriations(veriationsId);
  }
}
