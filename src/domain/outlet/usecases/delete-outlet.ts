import {type OutletRepository } from "@domain/outlet/repositories/outlet-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteOutletUsecase {
  execute: (outletId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteOutlet implements DeleteOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<Either<ErrorClass, void>> {
    return await this.outletRepository.deleteOutlet(outletId);
  }
}
