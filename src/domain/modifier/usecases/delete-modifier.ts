import {type ModifierRepository } from "@domain/modifier/repositories/modifier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteModifierUsecase {
  execute: (modifierId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteModifier implements DeleteModifierUsecase {
  private readonly modifierRepository: ModifierRepository;

  constructor(modifierRepository: ModifierRepository) {
    this.modifierRepository = modifierRepository;
  }

  async execute(modifierId: string): Promise<Either<ErrorClass, void>> {
    return await this.modifierRepository.deleteModifier(modifierId);
  }
}
