// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventorySDPService } from "@presentation/services/inventorySDP-services";
import { InventorySDPDataSourceImpl } from "@data/inventorySDP/datasource/inventorySDP-data-source";
import { InventorySDPRepositoryImpl } from "@data/inventorySDP/repositories/inventorySDP-repository-impl";
import { CreateInventorySDP } from "@domain/inventorySDP/usecases/create-inventorySDP";
import { GetInventorySDPById } from "@domain/inventorySDP/usecases/get-inventorySDP-by-id";
import { GetAllInventorySDPs } from "@domain/inventorySDP/usecases/get-all-inventorySDP";
import { UpdateInventorySDP } from "@domain/inventorySDP/usecases/update-inventorySDP";
import { DeleteInventorySDP } from "@domain/inventorySDP/usecases/delete-inventorySDP";

const inventorySDPDataSource = new InventorySDPDataSourceImpl(mongoose.connection);

const inventorySDPRepository = new InventorySDPRepositoryImpl(inventorySDPDataSource);


const createInventorySDPUsecase = new CreateInventorySDP(inventorySDPRepository);
const getInventorySDPByIdUsecase = new GetInventorySDPById(inventorySDPRepository);
const getAllInventorySDPsUsecase = new GetAllInventorySDPs(inventorySDPRepository);
const updateInventorySDPUsecase = new UpdateInventorySDP(inventorySDPRepository);
const deleteInventorySDPUsecase = new DeleteInventorySDP(inventorySDPRepository);

const inventorySDPService = new InventorySDPService(
    createInventorySDPUsecase,
    getInventorySDPByIdUsecase,
    getAllInventorySDPsUsecase,
    updateInventorySDPUsecase,
    deleteInventorySDPUsecase,
);

// Create an Express router
export const inventorySDPRouter = Router();

// Route handling for creating a new inventory SDP
inventorySDPRouter.post("/create", inventorySDPService.createInventorySDP.bind(inventorySDPService));

// Route handling for getting all inventory SDPs
inventorySDPRouter.get("/getAllInventorySDPs", inventorySDPService.getAllInventorySDPs.bind(inventorySDPService));

// Route handling for getting an inventory SDP by ID
inventorySDPRouter.get("/getById/:inventorySDPId", inventorySDPService.getInventorySDPById.bind(inventorySDPService));


// Route handling for updating an inventory SDP by ID
inventorySDPRouter.put("/update/:inventorySDPId", inventorySDPService.updateInventorySDP.bind(inventorySDPService));

// Route handling for deleting an inventory SDP by ID
inventorySDPRouter.delete("/delete/:inventorySDPId", inventorySDPService.deleteInventorySDP.bind(inventorySDPService));