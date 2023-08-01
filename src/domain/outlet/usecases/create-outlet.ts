import { OutletEntity, OutletModel } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface CreateOutletUsecase {
  execute: (outletData: OutletModel) => Promise<OutletEntity>;
}

export class CreateOutlet implements CreateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(OutletRepository: OutletRepository) {
    this.outletRepository = OutletRepository;
  }

  async execute(outletData: OutletModel): Promise<OutletEntity> {
    return await this.outletRepository.createOutlet(outletData);
  }
}