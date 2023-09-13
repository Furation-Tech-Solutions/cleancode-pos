// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { RequisitionService } from "@presentation/services/requisition-services";
import { RequisitionDataSourceImpl } from "@data/requisition/datasource/requisition-data-source";
import { RequisitionRepositoryImpl } from "@data/requisition/repositories/requisition-repository-impl";
import { CreateRequisition } from "@domain/requisition/usecases/create-requisition";
import { GetRequisitionById } from "@domain/requisition/usecases/get-requisition-by-id";
import { UpdateRequisition } from "@domain/requisition/usecases/update-requistion";
import { GetAllRequisitions } from "@domain/requisition/usecases/get-all-requisition";
import { DeleteRequisition } from "@domain/requisition/usecases/delete-requisition"

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const requisitionDataSource = new RequisitionDataSourceImpl(
  mongoose.connection
);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const requisitionRepository = new RequisitionRepositoryImpl(
  requisitionDataSource
);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createRequisitionUsecase = new CreateRequisition(requisitionRepository);
const getRequisitionByIdUsecase = new GetRequisitionById(requisitionRepository);
const getAllRequisitionUsecase = new GetAllRequisitions(requisitionRepository);
const updateRequisitionUsecase = new UpdateRequisition(requisitionRepository);
const deleteRequisitionUsecase = new DeleteRequisition(requisitionRepository);

// Initialize AdminService and inject required dependencies
const requisitionService = new RequisitionService(
  createRequisitionUsecase,
  getRequisitionByIdUsecase,
  getAllRequisitionUsecase,
  updateRequisitionUsecase,
  deleteRequisitionUsecase
);

// Create an Express router
export const requisitionRouter = Router();

// Route handling for creating a new requisition
requisitionRouter.post(
  "/create",
  requisitionService.createRequisition.bind(requisitionService)
);

// Route handling for getting an requisition by ID
requisitionRouter.get(
  "/getById/:requisitionId",
  requisitionService.getRequisitionById.bind(requisitionService)
);

// Route handling for updating an requisition by ID
requisitionRouter.put(
  "/update/:requisitionId",
  requisitionService.updateRequisition.bind(requisitionService)
);

// Route handling for getting all requisitions
requisitionRouter.get(
  "/getAllRequisitions",
  requisitionService.getAllRequisitions.bind(requisitionService)
);

// Route handling for deleting an requisition by ID
requisitionRouter.delete(
  "/delete/:requisitionId",
  requisitionService.deleteRequisition.bind(requisitionService)
);
