import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetOutletByIdUsecase {
  execute: (outletId: string) => Promise<Either<ErrorClass, OutletEntity | null>>;
}

export class GetOutletById implements GetOutletByIdUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<Either<ErrorClass, OutletEntity | null>> {
    return await this.outletRepository.getOutletById(outletId);
  }
}
