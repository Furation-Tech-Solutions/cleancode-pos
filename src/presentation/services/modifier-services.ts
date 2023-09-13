import { NextFunction, Request, Response } from "express";
import {
  ModifierModel,
  ModifierEntity,
  ModifierMapper,
} from "@domain/modifier/entities/modifier";
import { CreateModifierUsecase } from "@domain/modifier/usecases/create-modifier";
import { DeleteModifierUsecase } from "@domain/modifier/usecases/delete-modifier";
import { GetModifierByIdUsecase } from "@domain/modifier/usecases/get-modifier-by-id";
import { UpdateModifierUsecase } from "@domain/modifier/usecases/update-modifier";
import { GetAllModifiersUsecase } from "@domain/modifier/usecases/get-all-modifiers";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class ModifierService {
  private readonly createModifierUsecase: CreateModifierUsecase;
  private readonly deleteModifierUsecase: DeleteModifierUsecase;
  private readonly getModifierByIdUsecase: GetModifierByIdUsecase;
  private readonly updateModifierUsecase: UpdateModifierUsecase;
  private readonly getAllModifiersUsecase: GetAllModifiersUsecase;

  constructor(
    createModifierUsecase: CreateModifierUsecase,
    deleteModifierUsecase: DeleteModifierUsecase,
    getModifierByIdUsecase: GetModifierByIdUsecase,
    updateModifierUsecase: UpdateModifierUsecase,
    getAllModifiersUsecase: GetAllModifiersUsecase
  ) {
    this.createModifierUsecase = createModifierUsecase;
    this.deleteModifierUsecase = deleteModifierUsecase;
    this.getModifierByIdUsecase = getModifierByIdUsecase;
    this.updateModifierUsecase = updateModifierUsecase;
    this.getAllModifiersUsecase = getAllModifiersUsecase;
  }

  async createModifier(req: Request, res: Response): Promise<void> {
      
      // Extract modifier data from the request body and convert it to ModifierModel
      const modifierData: ModifierModel = ModifierMapper.toModel(req.body);

      // Call the createModifierUsecase to create the modifier
      const newModifier: Either<ErrorClass, ModifierEntity> = await this.createModifierUsecase.execute(
        modifierData
      );

      newModifier.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ModifierEntity) =>{
          const responseData = ModifierMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteModifier(req: Request, res: Response): Promise<void> {
    
      const modifierId: string = req.params.modifierId;
    

      const updatedModifierEntity: ModifierEntity = ModifierMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateModifierUsecase to update the Modifier
      const updatedModifier: Either<ErrorClass, ModifierEntity> = await this.updateModifierUsecase.execute(
        modifierId,
        updatedModifierEntity
      );

      updatedModifier.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ModifierEntity) =>{
          const responseData = ModifierMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getModifierById(req: Request, res: Response): Promise<void> {
      const modifierId: string = req.params.modifierId;

      // Call the GetModifierByIdUsecase to get the modifier by ID
      const modifier: Either<ErrorClass, ModifierEntity | null> = await this.getModifierByIdUsecase.execute(
        modifierId
      );

      modifier.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ModifierEntity | null) =>{
          const responseData = ModifierMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateModifier(req: Request, res: Response): Promise<void> {
    
      const modifierId: string = req.params.modifierId;
      const modifierData: ModifierModel = req.body;

      // Get the existing Modifier by ID
      const existingModifier: Either<ErrorClass, ModifierEntity | null> =
        await this.getModifierByIdUsecase.execute(modifierId);

      if (!existingModifier) {
        // If modifier is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert modifierfData from ModifierModel to ModifierEntity using ModifierMapper
      const updatedModifierEntity: ModifierEntity = ModifierMapper.toEntity(
        modifierData,
        true,
      );

      // Call the UpdateModifierUsecase to update the Modifier
      const updatedModifier: Either<ErrorClass, ModifierEntity> = await this.updateModifierUsecase.execute(
        modifierId,
        updatedModifierEntity
      );

      updatedModifier.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ModifierEntity) =>{
          const responseData = ModifierMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllModifiers(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllModifiersUsecase to get all Modifiers
      const modifiers: Either<ErrorClass, ModifierEntity[]> = await this.getAllModifiersUsecase.execute();

      modifiers.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: ModifierEntity[]) => {
            // Filter out modifiers with del_status set to "Deleted"
            const nonDeletedModifiers = result.filter((modifier) => modifier.del_status !== false);

            // Convert non-deleted modifiers from an array of ModifierEntity to an array of plain JSON objects using ModifierMapper
            const responseData = nonDeletedModifiers.map((modifier) => ModifierMapper.toEntity(modifier));
            return res.json(responseData);
        }
    );
  }
}
