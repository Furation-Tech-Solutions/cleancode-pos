import { ModifierModel, ModifierEntity } from "@domain/modifier/entities/modifier";
import { ModifierRepository } from "@domain/modifier/repositories/modifier-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateModifierUsecase {
  execute: (
    modifierId: string,
    modifierData: ModifierModel
  ) => Promise<Either<ErrorClass, ModifierEntity>>;
}

export class UpdateModifier implements UpdateModifierUsecase {
  private readonly modifierRepository: ModifierRepository;

  constructor(modifierRepository: ModifierRepository) {
    this.modifierRepository = modifierRepository;
  }
  async execute(modifierId: string, modifierData: ModifierModel): Promise<Either<ErrorClass, ModifierEntity>> {
   return await this.modifierRepository.updateModifier(modifierId, modifierData);
 }
}
