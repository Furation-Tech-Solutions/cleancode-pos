// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InternalTransferService } from "@presentation/services/internalTransfer-services";
import { InternalTransferDataSourceImpl } from "@data/internalTransfer/datasources/internalTransfer-data-source";
import { InternalTransferRepositoryImpl } from "@data/internalTransfer/repositories/internalTransfer-repository-impl";
import { CreateInternalTransfer } from "@domain/internalTransfer/usecases/create-internalTransfer";
import { DeleteInternalTransfer } from "@domain/internalTransfer/usecases/delete-internalTransfer";
import { GetInternalTransferById } from "@domain/internalTransfer/usecases/get-internalTransfer-by-id";
import { GetAllInternalTransfers } from "@domain/internalTransfer/usecases/get-all-internalTransfer";
import { UpdateInternalTransfer } from "@domain/internalTransfer/usecases/update-internalTransfer";

// Create an instance of the InternalTranferDataSourceImpl and pass the mongoose connection
const internalTransferDataSource = new InternalTransferDataSourceImpl(
  mongoose.connection
);

// Create an instance of the InternalTranferRepositoryImpl and pass the InternalTranferDataSourceImpl
const internalTransferRepository = new InternalTransferRepositoryImpl(
  internalTransferDataSource
);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createInternalTransferUsecase = new CreateInternalTransfer(
  internalTransferRepository
);
const deleteInternalTransferUsecase = new DeleteInternalTransfer(
  internalTransferRepository
);
const getInternalTransferByIdUsecase = new GetInternalTransferById(
  internalTransferRepository
);
const updateInternalTransferUsecase = new UpdateInternalTransfer(
  internalTransferRepository
);
const getAllInternalTransferUsecase = new GetAllInternalTransfers(
  internalTransferRepository
);

// Initialize internalTransferService and inject required dependencies
const internalTransferService = new InternalTransferService(
  createInternalTransferUsecase,
  deleteInternalTransferUsecase,
  getInternalTransferByIdUsecase,
  updateInternalTransferUsecase,
  getAllInternalTransferUsecase
);

// Create an Express router
export const internalTransferRouter = Router();

// Route handling for creating a new InternalTransfer
internalTransferRouter.post(
  "/create",
  internalTransferService.createInternalTransfer.bind(internalTransferService)
);

// Route handling for getting an InternalTransfer by ID
internalTransferRouter.get(
  "/getById/:internalTransferId",
  internalTransferService.getInternalTransferById.bind(internalTransferService)
);

// Route handling for updating an InternalTransfer by ID
internalTransferRouter.put(
  "/update/:internalTransferId",
  internalTransferService.updateInternalTransfer.bind(internalTransferService)
);

// Route handling for deleting an InternalTransfer by ID
internalTransferRouter.delete(
  "/delete/:internalTransferId",
  internalTransferService.deleteInternalTransfer.bind(internalTransferService)
);

// Route handling for getting all internalTransfers
internalTransferRouter.get(
  "/getAllInternalTransfers",
  internalTransferService.getAllInternalTransfers.bind(internalTransferService)
);
