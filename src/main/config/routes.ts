import { adminRouter } from "@presentation/routes/admin-routes";
import { staffRouter } from "@presentation/routes/staff-routes";
import { inventoryRouter } from "@presentation/routes/inventory-routes";
import { tableRouter } from "@presentation/routes/table-routes";
import { ingredientUnitRouter } from "@presentation/routes/ingredientUnit-routes";
import { areaRouter } from "@presentation/routes/area-route";

import { kitchenRouter } from "@presentation/routes/kitchen-routes";

import { ingredientCategoryRouter } from "@presentation/routes/ingredientCategory-routes";
import {outletRouter } from "@presentation/routes/outlet-route";
import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { companyRouter } from "@presentation/routes/company-route";
import { inventoryStockRouter } from "@presentation/routes/inventoryStock-routes";
import { purchaseRouter } from "@presentation/routes/purchase-routes";
import { purchaseItemRouter } from "@presentation/routes/purchaseItem-routes";
import { requisitionRouter } from "@presentation/routes/requisition-routes";
import { requisitionItemRouter } from "@presentation/routes/requisitionItem-routes";
import { inventorySDPRouter } from "@presentation/routes/inventorySDP-routes";
import { internalTransferRouter } from "@presentation/routes/internalTransfer-routes";
import { inventoryBillingRouter } from "@presentation/routes/inventoryBilling-routes";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();
    res.status(200).json({ message: "ok" });
  });

  app.use("/table", tableRouter);
  app.use("/ingredientUnit", ingredientUnitRouter);
  app.use("/area", areaRouter)
  app.use("/kitchen", kitchenRouter)

  app.use("/ingredientCategory", ingredientCategoryRouter);
  app.use("/admin",adminRouter);
  app.use("/outlet", outletRouter);
  app.use("/company", companyRouter);
  app.use(router);
  app.use("/staff", staffRouter);
  app.use("/inventory", inventoryRouter);
  app.use("/inventoryStock", inventoryStockRouter);
  app.use("/purchase", purchaseRouter);
  app.use("/purchaseItem", purchaseItemRouter);
  app.use("/requisition", requisitionRouter);
  app.use("/requisitionItem", requisitionItemRouter);
  app.use("/inventorySDP", inventorySDPRouter);
  app.use("/internalTransfer", internalTransferRouter);
  app.use("/inventoryBilling", inventoryBillingRouter);
};
