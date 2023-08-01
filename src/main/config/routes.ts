import { adminRouter } from "@presentation/routes/admin-routes";
import {outletRouter } from "@presentation/routes/outlet-route"
import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { companyRouter } from "@presentation/routes/company-route";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();

    res.status(200).json({ message: "ok" });
  });

  app.use("/admin",adminRouter);
  app.use("/outlet", outletRouter);
  app.use("/company", companyRouter);
  app.use(router);
};
