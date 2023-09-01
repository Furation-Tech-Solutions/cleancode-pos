// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { RequisitionItemService } from "@presentation/services/requisitionItem-services";
import { RequisitionItemDataSourceImpl } from "@data/requisitionItem/datasource/requisitionItem-data-source";
import { RequisitionItemRepositoryImpl } from "@data/requisitionItem/repositories/requisitionItem-repository-impl";
import { CreateRequisitionItem } from "@domain/requisitionItem/usecases/create-requisitionItem";
import { GetRequisitionItemById } from "@domain/requisitionItem/usecases/get-requisitionItem-by-id";
import { UpdateRequisitionItem } from "@domain/requisitionItem/usecases/update-requisitionItem";
import { GetAllRequisitionItems } from "@domain/requisitionItem/usecases/get-all-requisitionItem";
import { DeleteRequisitionItem } from "@domain/requisitionItem/usecases/delete-requisitionItem";

// Create an instance of the RequisitionItemDataSourceImpl and pass the mongoose connection
const requisitionItemDataSource = new RequisitionItemDataSourceImpl(
  mongoose.connection
);

// Create an instance of the RequisitionItemRepositoryImpl and pass the AdminDataSourceImpl
const requisitionItemRepository = new RequisitionItemRepositoryImpl(
  requisitionItemDataSource
);

// Create instances of the required use cases and pass the RequisitionItemRepositoryImpl
const createRequisitionItemUsecase = new CreateRequisitionItem(
  requisitionItemRepository
);
const getRequisitionItemByIdUsecase = new GetRequisitionItemById(
  requisitionItemRepository
);
const getAllRequisitionItemUsecase = new GetAllRequisitionItems(
  requisitionItemRepository
);
const updateRequisitionItemUsecase = new UpdateRequisitionItem(
  requisitionItemRepository
);
const deleteRequisitionItemUsecase = new DeleteRequisitionItem(
  requisitionItemRepository
);

// Initialize RequisitionItemService and inject required dependencies
const requisitionItemService = new RequisitionItemService(
  createRequisitionItemUsecase,
  getRequisitionItemByIdUsecase,
  getAllRequisitionItemUsecase,
  updateRequisitionItemUsecase,
  deleteRequisitionItemUsecase
);

// Create an Express router
export const requisitionItemRouter = Router();

// Route handling for creating a new requisitionItem
requisitionItemRouter.post(
  "/create",
  requisitionItemService.createRequisitionItem.bind(requisitionItemService)
);

// Route handling for getting an requisitionItem by ID
requisitionItemRouter.get(
  "/getById/:requisitionItemId",
  requisitionItemService.getRequisitionItemById.bind(requisitionItemService)
);

// Route handling for updating an requisitionItem by ID
requisitionItemRouter.put(
  "/update/:requisitionItemId",
  requisitionItemService.updateRequisitionItem.bind(requisitionItemService)
);

// Route handling for getting all requisitionItem
requisitionItemRouter.get(
  "/getAllRequisitionItems",
  requisitionItemService.getAllRequisitionItems.bind(requisitionItemService)
);

// Route handling for deleting an requisitionItem by ID
requisitionItemRouter.delete(
  "/delete/:requisitionItemId",
  requisitionItemService.deleteRequisitionItem.bind(requisitionItemService)
);
