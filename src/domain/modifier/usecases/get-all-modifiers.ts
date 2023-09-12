import { ModifierModel, ModifierEntity } from "@domain/modifier/entities/modifier";
import { ModifierRepository } from "@domain/modifier/repositories/modifier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllModifiersUsecase {
  execute: () => Promise<Either<ErrorClass, ModifierEntity[]>>;
}

export class GetAllModifiers implements GetAllModifiersUsecase {
  private readonly modifierRepository: ModifierRepository;

  constructor(modifierRepository: ModifierRepository) {
    this.modifierRepository = modifierRepository;
  }

  async execute(): Promise<Either<ErrorClass, ModifierEntity[]>> {
    return await this.modifierRepository.getModifiers();
  }
}
