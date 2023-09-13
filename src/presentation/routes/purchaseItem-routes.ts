// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { PurchaseItemService } from "@presentation/services/purchaseItem-services";
import { PurchaseItemDataSourceImpl } from "@data/purchaseItem/datasource/purchaseItem-data-source";
import { PurchaseItemRepositoryImpl } from "@data/purchaseItem/repositories/purchaseItem-repository-impl";
import { CreatePurchaseItem } from "@domain/purchaseItem/usecases/create-purchaseItem";
import { GetPurchaseItemById } from "@domain/purchaseItem/usecases/get-purchaseItem-by-id";
import { GetAllPurchaseItems } from "@domain/purchaseItem/usecases/get-all-purchaseItems";
import { UpdatePurchaseItem } from "@domain/purchaseItem/usecases/update-purchaseItem";
import { DeletePurchaseItem } from "@domain/purchaseItem/usecases/delete-purchaseItem";

const purchaseItemDataSource = new PurchaseItemDataSourceImpl(mongoose.connection);

const purchaseItemRepository = new PurchaseItemRepositoryImpl(purchaseItemDataSource);


const createPurchaseItemUsecase = new CreatePurchaseItem(purchaseItemRepository);
const getPurchaseItemByIdUsecase = new GetPurchaseItemById(purchaseItemRepository);
const getAllPurchaseItemsUsecase = new GetAllPurchaseItems(purchaseItemRepository);
const updatePurchaseItemUsecase = new UpdatePurchaseItem(purchaseItemRepository);
const deletePurchaseItemUsecase = new DeletePurchaseItem(purchaseItemRepository);

const purchaseItemService = new PurchaseItemService(
    createPurchaseItemUsecase,
    getPurchaseItemByIdUsecase,
    getAllPurchaseItemsUsecase,
    updatePurchaseItemUsecase,
    deletePurchaseItemUsecase,
);

// Create an Express router
export const purchaseItemRouter = Router();

// Route handling for creating a new inventory Item
purchaseItemRouter.post("/create", purchaseItemService.createPurchaseItem.bind(purchaseItemService));

// Route handling for getting all inventory Items
purchaseItemRouter.get("/getAllPurchaseItems", purchaseItemService.getAllPurchaseItems.bind(purchaseItemService));

// Route handling for getting an inventory Item by ID
purchaseItemRouter.get("/getById/:purchaseItemId", purchaseItemService.getPurchaseItemById.bind(purchaseItemService));

// Route handling for updating an inventory Item by ID
purchaseItemRouter.put("/update/:purchaseItemId", purchaseItemService.updatePurchaseItem.bind(purchaseItemService));

// Route handling for deleting an inventory Item by ID
purchaseItemRouter.delete("/delete/:purchaseItemId", purchaseItemService.deletePurchaseItem.bind(purchaseItemService));