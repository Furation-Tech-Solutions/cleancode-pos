// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { BillingDetailsService } from "@presentation/services/billingDetails-services";
import { BillingDetailsDataSourceImpl } from "@data/billingDetails/datasource/billingDetails-data-source";
import { BillingDetailsRepositoryImpl } from "@data/billingDetails/repositories/billingDetails-repository-impl";
import { CreateBillingDetails } from "@domain/billingDetails/usecases/create-billingDetails";
import { DeleteBillingDetails } from "@domain/billingDetails/usecases/delete-billingDetails";
import { GetBillingDetailsById } from "@domain/billingDetails/usecases/get-billingDetails-by-id";
import { GetAllBillingDetailss } from "@domain/billingDetails/usecases/get-all-billingDetails";
import { UpdateBillingDetails } from "@domain/billingDetails/usecases/update-billingDetails";
import validateBillingDetailsMiddleware from "@presentation/middlewares/billingDetails/validation-middleware";

// Create an instance of the BillingDetailsDataSourceImpl and pass the mongoose connection
const billingDetailsDataSource = new BillingDetailsDataSourceImpl(mongoose.connection);

// Create an instance of the BillingDetailsRepositoryImpl and pass the BillingDetailsDataSourceImpl
const billingDetailsRepository = new BillingDetailsRepositoryImpl(billingDetailsDataSource);

// Create instances of the required use cases and pass the BillingDetailsRepositoryImpl
const createBillingDetailsUsecase = new CreateBillingDetails(billingDetailsRepository);
const deleteBillingDetailsUsecase = new DeleteBillingDetails(billingDetailsRepository);
const getBillingDetailsByIdUsecase = new GetBillingDetailsById(billingDetailsRepository);
const updateBillingDetailsUsecase = new UpdateBillingDetails(billingDetailsRepository);
const getAllBillingDetailssUsecase = new GetAllBillingDetailss(billingDetailsRepository);

// Initialize BillingDetailsService and inject required dependencies
const billingDetailsService = new BillingDetailsService(
  createBillingDetailsUsecase,
  deleteBillingDetailsUsecase,
  getBillingDetailsByIdUsecase,
  updateBillingDetailsUsecase,
  getAllBillingDetailssUsecase
);

// Create an Express router
export const billingDetailsRouter = Router();

// Route handling for creating a new billingDetails
billingDetailsRouter.post("/new", validateBillingDetailsMiddleware, billingDetailsService.createBillingDetails.bind(billingDetailsService));

// Route handling for getting an billingDetails by ID
billingDetailsRouter.get("/show/:billingDetailsId", billingDetailsService.getBillingDetailsById.bind(billingDetailsService));

// Route handling for updating an billingDetails by ID
billingDetailsRouter.put("/update/:billingDetailsId", billingDetailsService.updateBillingDetails.bind(billingDetailsService));

// Route handling for deleting an billingDetails by ID
billingDetailsRouter.delete("/delete/:billingDetailsId", billingDetailsService.deleteBillingDetails.bind(billingDetailsService));

// Route handling for getting all billingDetailss
billingDetailsRouter.get("/list", billingDetailsService.getAllBillingDetailss.bind(billingDetailsService));
