import { adminRouter } from "@presentation/routes/admin-routes";
import { staffRouter } from "@presentation/routes/staff-routes";
import { inventoryRouter } from "@presentation/routes/inventory-routes";
import { tableRouter } from "@presentation/routes/table-routes";
import { ingredientUnitRouter } from "@presentation/routes/ingredientUnit-routes";

import { ingredientCategoryRouter } from "@presentation/routes/ingredientCategory-routes";

import {outletRouter } from "@presentation/routes/outlet-route";
import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { companyRouter } from "@presentation/routes/company-route";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();
    res.status(200).json({ message: "ok" });
  });

  app.use("/table", tableRouter);
  app.use("/ingredientUnit", ingredientUnitRouter);
  app.use("/ingredientCategory", ingredientCategoryRouter);
  app.use("/admin",adminRouter);
  app.use("/outlet", outletRouter);
  app.use("/company", companyRouter);
  app.use(router);
  app.use("/staff", staffRouter);
  app.use("/inventory", inventoryRouter);
};
