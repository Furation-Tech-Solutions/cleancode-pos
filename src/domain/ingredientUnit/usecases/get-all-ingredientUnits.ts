import { IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllIngredientUnitsUsecase {
  execute: () => Promise<Either<ErrorClass, IngredientUnitEntity[]>>;
}

export class GetAllIngredientUnits implements GetAllIngredientUnitsUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(): Promise<Either<ErrorClass, IngredientUnitEntity[]>> {
    return await this.ingredientUnitRepository.getIngredientUnits();
  }
}
