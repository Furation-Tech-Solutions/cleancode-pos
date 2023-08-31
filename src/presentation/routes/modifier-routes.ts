// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ModifierService } from "@presentation/services/modifier-services";
import { ModifierDataSourceImpl } from "@data/modifier/datasource/modifier-data-source";
import { ModifierRepositoryImpl } from "@data/modifier/repositories/modifier-repository-impl";
import { CreateModifier } from "@domain/modifier/usecases/create-modifier";
import { DeleteModifier } from "@domain/modifier/usecases/delete-modifier";
import { GetModifierById } from "@domain/modifier/usecases/get-modifier-by-id";
import { GetAllModifiers } from "@domain/modifier/usecases/get-all-modifiers";
import { UpdateModifier } from "@domain/modifier/usecases/update-modifier";
import validateModifierMiddleware from "@presentation/middlewares/modifier/validation-middleware";

// Create an instance of the ModifierDataSourceImpl and pass the mongoose connection
const modifierDataSource = new ModifierDataSourceImpl(mongoose.connection);

// Create an instance of the ModifierRepositoryImpl and pass the ModifierDataSourceImpl
const modifierRepository = new ModifierRepositoryImpl(modifierDataSource);

// Create instances of the required use cases and pass the ModifierRepositoryImpl
const createModifierUsecase = new CreateModifier(modifierRepository);
const deleteModifierUsecase = new DeleteModifier(modifierRepository);
const getModifierByIdUsecase = new GetModifierById(modifierRepository);
const updateModifierUsecase = new UpdateModifier(modifierRepository);
const getAllModifiersUsecase = new GetAllModifiers(modifierRepository);

// Initialize ModifierService and inject required dependencies
const modifierService = new ModifierService(
  createModifierUsecase,
  deleteModifierUsecase,
  getModifierByIdUsecase,
  updateModifierUsecase,
  getAllModifiersUsecase
);

// Create an Express router
export const modifierRouter = Router();

// Route handling for creating a new modifier
modifierRouter.post("/new", validateModifierMiddleware, modifierService.createModifier.bind(modifierService));

// Route handling for getting an modifier by ID
modifierRouter.get("/show/:modifierId", modifierService.getModifierById.bind(modifierService));

// Route handling for updating an modifier by ID
modifierRouter.put("/update/:modifierId", modifierService.updateModifier.bind(modifierService));

// Route handling for deleting an modifier by ID
modifierRouter.delete("/delete/:modifierId", modifierService.deleteModifier.bind(modifierService));

// Route handling for getting all modifiers
modifierRouter.get("/list", modifierService.getAllModifiers.bind(modifierService));
