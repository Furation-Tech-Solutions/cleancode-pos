// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InternalTransferItemService } from "@presentation/services/internalTransferItem-services";
import { InternalTransferItemDataSourceImpl } from "@data/internalTransferItem/datasources/internalTransferItem-data-source";
import { InternalTransferItemRepositoryImpl } from "@data/internalTransferItem/repositories/internalTransferItem-repository-impl";
import { CreateInternalTransferItem } from "@domain/internalTransferItem/usecases/create-internalTransferItem";
import { DeleteInternalTransferItem } from "@domain/internalTransferItem/usecases/delete-internalTransferItem";
import { GetInternalTransferItemById } from "@domain/internalTransferItem/usecases/get-internalTransferItem-by-id";
import { GetAllInternalTransferItems } from "@domain/internalTransferItem/usecases/get-all-internalTransferItems";
import { UpdateInternalTransferItem } from "@domain/internalTransferItem/usecases/update-internalTransferItem";

// Create an instance of the InternalTranferItemDataSourceImpl and pass the mongoose connection
const internalTransferItemDataSource = new InternalTransferItemDataSourceImpl(
  mongoose.connection
);

// Create an instance of the InternalTranferItemRepositoryImpl and pass the InternalTranferItemDataSourceImpl
const internalTransferItemRepository = new InternalTransferItemRepositoryImpl(
  internalTransferItemDataSource
);

// Create instances of the required use cases and pass the InternalTransferItemRepositoryImpl
const createInternalTransferItemUsecase = new CreateInternalTransferItem(
  internalTransferItemRepository
);
const deleteInternalTransferItemUsecase = new DeleteInternalTransferItem(
  internalTransferItemRepository
);
const getInternalTransferItemByIdUsecase = new GetInternalTransferItemById(
  internalTransferItemRepository
);
const updateInternalTransferItemUsecase = new UpdateInternalTransferItem(
  internalTransferItemRepository
);
const getAllInternalTransferItemUsecase = new GetAllInternalTransferItems(
  internalTransferItemRepository
);

// Initialize internalTransferItemService and inject required dependencies
const internalTransferItemService = new InternalTransferItemService(
  createInternalTransferItemUsecase,
  deleteInternalTransferItemUsecase,
  getInternalTransferItemByIdUsecase,
  updateInternalTransferItemUsecase,
  getAllInternalTransferItemUsecase
);

// Create an Express router
export const internalTransferItemRouter = Router();

// Route handling for creating a new InternalTransferItem
internalTransferItemRouter.post(
  "/create",
  internalTransferItemService.createInternalTransferItem.bind(
    internalTransferItemService
  )
);

// Route handling for getting an InternalTransferItem by ID
internalTransferItemRouter.get(
  "/getById/:internalTransferItemId",
  internalTransferItemService.getInternalTransferItemById.bind(
    internalTransferItemService
  )
);

// Route handling for updating an InternalTransferItem by ID
internalTransferItemRouter.put(
  "/update/:internalTransferItemId",
  internalTransferItemService.updateInternalTransferItem.bind(
    internalTransferItemService
  )
);

// Route handling for deleting an InternalTransferItem by ID
internalTransferItemRouter.delete(
  "/delete/:internalTransferItemId",
  internalTransferItemService.deleteInternalTransferItem.bind(
    internalTransferItemService
  )
);

// Route handling for getting all internalTransferItems
internalTransferItemRouter.get(
  "/getAllinternalTransferItems",
  internalTransferItemService.getAllInternalTransferItems.bind(
    internalTransferItemService
  )
);
