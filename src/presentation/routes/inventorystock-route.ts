import { InventorystockDataSourceImpl } from "@data/inventoryStock/datasources/inventorystock-data-source";
import { InventorystockRepositoryImpl } from "@data/inventoryStock/repositories/inventorystock-repositories-impl";
import { CreateInventorystock } from "@domain/inventoryStock/usecases/create-inventorystock";
import { DeleteInventorystock } from "@domain/inventoryStock/usecases/delete-inventorystock";
import { GetAllInventorystock } from "@domain/inventoryStock/usecases/get-all-inventorystock";
import { GetInventorystockById } from "@domain/inventoryStock/usecases/get-inventorystock-by-id";
import { UpdateInventorystock } from "@domain/inventoryStock/usecases/update-inventorystock";
import { InventorystockServices } from "@presentation/services/inventorystock-service";
import { Router } from "express";
import mongoose from "mongoose";


const inventorystockDataSource= new InventorystockDataSourceImpl(mongoose.connection);

const inventorystockRepository= new InventorystockRepositoryImpl(inventorystockDataSource);

const createInventorystockUsecase= new CreateInventorystock(inventorystockRepository);
const deleteInventorystockUsecase= new DeleteInventorystock(inventorystockRepository);
const updateInventorystockUsecase= new UpdateInventorystock(inventorystockRepository);
const getAllInventorystockUsecase= new GetAllInventorystock(inventorystockRepository);
const getInventorystockByIdUsecase= new GetInventorystockById(inventorystockRepository);

const inventorystockService= new InventorystockServices(
    createInventorystockUsecase,
    deleteInventorystockUsecase,
    updateInventorystockUsecase,
    getAllInventorystockUsecase,
    getInventorystockByIdUsecase
)

export const InventorystockRouter= Router();

InventorystockRouter.get("/", inventorystockService.getAllInventoystock.bind(inventorystockService));
InventorystockRouter.get("/:id", inventorystockService.getInventorystockById.bind(inventorystockService));
InventorystockRouter.post("/new", inventorystockService.createInventorystock.bind(inventorystockService));
InventorystockRouter.put("/:id", inventorystockService.updateInventorystock.bind(inventorystockService));
InventorystockRouter.delete("/:id", inventorystockService.deleteInventorystock.bind(inventorystockService));