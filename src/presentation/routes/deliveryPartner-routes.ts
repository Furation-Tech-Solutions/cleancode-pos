// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { DeliveryPartnerService } from "@presentation/services/deliveryPartner-services";
import { DeliveryPartnerDataSourceImpl } from "@data/deliveryPartner/datasources/deliveryPartner-data-source";
import { DeliveryPartnerRepositoryImpl } from "@data/deliveryPartner/repositories/deliveryPartner-repository-impl";
import { CreateDeliveryPartner } from "@domain/deliveryPartner/usecases/create-deliveryPartner";
import { DeleteDeliveryPartner } from "@domain/deliveryPartner/usecases/delete-deliveryPartner";
import { GetDeliveryPartnerById } from "@domain/deliveryPartner/usecases/get-deliveryPartner-by-id";
import { GetAllDeliveryPartners } from "@domain/deliveryPartner/usecases/get-all-deliveryPartners";
import { UpdateDeliveryPartner } from "@domain/deliveryPartner/usecases/update-deliveryPartner";
import validateDeliveryPartnerMiddleware from "@presentation/middlewares/deliveryPartner/validation-middleware";

// Create an instance of the DeliveryPartnerDataSourceImpl and pass the mongoose connection
const deliveryPartnerDataSource = new DeliveryPartnerDataSourceImpl(mongoose.connection);

// Create an instance of the DeliveryPartnerRepository and pass the DeliveryPartnerDataSourceImpl
const deliveryPartnerRepository = new DeliveryPartnerRepositoryImpl(deliveryPartnerDataSource);

// Create instances of the required use cases and pass the DeliveryPartnerRepositoryImpl
const createDeliveryPartnerUsecase = new CreateDeliveryPartner(deliveryPartnerRepository);
const deleteDeliveryPartnerUsecase = new DeleteDeliveryPartner(deliveryPartnerRepository);
const getDeliveryPartnerByIdUsecase = new GetDeliveryPartnerById(deliveryPartnerRepository);
const updateDeliveryPartnerUsecase = new UpdateDeliveryPartner(deliveryPartnerRepository);
const getAllDeliveryPartnersUsecase = new GetAllDeliveryPartners(deliveryPartnerRepository);

// Initialize DeliveryPartnerService and inject required dependencies
const deliveryPartnerService = new DeliveryPartnerService(
  createDeliveryPartnerUsecase,
  deleteDeliveryPartnerUsecase,
  getDeliveryPartnerByIdUsecase,
  updateDeliveryPartnerUsecase,
  getAllDeliveryPartnersUsecase
);

// Create an Express router
export const deliveryPartnerRouter = Router();

// Route handling for creating a new deliveryPartner
deliveryPartnerRouter.post("/new", validateDeliveryPartnerMiddleware, deliveryPartnerService.createDeliveryPartner.bind(deliveryPartnerService));

// Route handling for getting an deliveryPartner by ID
deliveryPartnerRouter.get("/show/:deliveryPartnerId", deliveryPartnerService.getDeliveryPartnerById.bind(deliveryPartnerService));

// Route handling for updating an deliveryPartner by ID
deliveryPartnerRouter.put("/update/:deliveryPartnerId", deliveryPartnerService.updateDeliveryPartner.bind(deliveryPartnerService));

// Route handling for deleting an deliveryPartner by ID
deliveryPartnerRouter.delete("/delete/:deliveryPartnerId", deliveryPartnerService.deleteDeliveryPartner.bind(deliveryPartnerService));

// Route handling for getting all deliveryPartner
deliveryPartnerRouter.get("/list", deliveryPartnerService.getAllDeliveryPartners.bind(deliveryPartnerService));
