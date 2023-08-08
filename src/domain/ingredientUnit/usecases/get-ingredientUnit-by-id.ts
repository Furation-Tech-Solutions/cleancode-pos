import { IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetIngredientUnitByIdUsecase {
  execute: (ingredientUnitId: string) => Promise<Either<ErrorClass, IngredientUnitEntity | null>>;
}

export class GetIngredientUnitById implements GetIngredientUnitByIdUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitId: string): Promise<Either<ErrorClass, IngredientUnitEntity | null>> {
    return await this.ingredientUnitRepository.getIngredientUnitById(ingredientUnitId);
  }
}
