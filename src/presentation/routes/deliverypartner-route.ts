import mongoose from "mongoose";
import { Router } from "express";
import { DeliverypartnerDataSourceImpl } from "@data/deliverypartner/datasources/deliverypartner-data-source";
import { DeliverypartnerRepositoryImpl } from "@data/deliverypartner/repositories/deliverypartner-repositories-impl";
import { CreateDeliverypartner } from "@domain/deliverypartner/usecases/create-deliverypartner";
import { DeleteDeliverypartner } from "@domain/deliverypartner/usecases/delete-deliverypartner";
import { UpdateDeliverypartner } from "@domain/deliverypartner/usecases/update-deliverypartner";
import { GetAllDeliverypartner } from "@domain/deliverypartner/usecases/get-all-deliverypartner";
import { GetDeliverypartnerById } from "@domain/deliverypartner/usecases/get-deliverypartner-by-id";
import { DeliverypartnerServices } from "@presentation/services/deliverypartner-services";

const deliverypartnerDataSource= new DeliverypartnerDataSourceImpl(mongoose.connection);

const deliverypartnerRepository= new DeliverypartnerRepositoryImpl(deliverypartnerDataSource);

const createDeliverypartnerUsecase= new CreateDeliverypartner(deliverypartnerRepository);
const deleteDeliverypartnerUsecase= new DeleteDeliverypartner(deliverypartnerRepository);
const getAllDeliverypartnerUsecase= new GetAllDeliverypartner(deliverypartnerRepository);
const getDeliverypartnerByIdUsecase= new GetDeliverypartnerById(deliverypartnerRepository);
const updateDeliverypartnerUsecase= new UpdateDeliverypartner(deliverypartnerRepository);

const deliverypartnerService= new DeliverypartnerServices(
    createDeliverypartnerUsecase, 
    deleteDeliverypartnerUsecase, 
    getAllDeliverypartnerUsecase, 
    getDeliverypartnerByIdUsecase,
    updateDeliverypartnerUsecase
)

export const deliverypartnerRouter= Router();

deliverypartnerRouter.get("/", deliverypartnerService.getAllDeliverypartner.bind(deliverypartnerService));
deliverypartnerRouter.get("/:id", deliverypartnerService.getDeliverypartnerById.bind(deliverypartnerService));
deliverypartnerRouter.post("/new", deliverypartnerService.createDeliverypartner.bind(deliverypartnerService));
deliverypartnerRouter.put("/:id", deliverypartnerService.updateDeliverypartner.bind(deliverypartnerService));
deliverypartnerRouter.delete("/:id", deliverypartnerService.deleteDeliverypartner.bind(deliverypartnerService));
