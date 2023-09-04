import { ModifierModel, ModifierEntity } from "@domain/modifier/entities/modifier";
import { ModifierRepository } from "@domain/modifier/repositories/modifier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetModifierByIdUsecase {
  execute: (modifierId: string) => Promise<Either<ErrorClass, ModifierEntity | null>>;
}

export class GetModifierById implements GetModifierByIdUsecase {
  private readonly modifierRepository: ModifierRepository;

  constructor(modifierRepository: ModifierRepository) {
    this.modifierRepository = modifierRepository;
  }

  async execute(modifierId: string): Promise<Either<ErrorClass, ModifierEntity | null>> {
    return await this.modifierRepository.getModifierById(modifierId);
  }
}
