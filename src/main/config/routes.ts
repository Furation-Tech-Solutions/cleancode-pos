import { adminRouter } from "@presentation/routes/admin-routes";
import { staffRouter } from "@presentation/routes/staff-routes";
import { type Express, Router } from "express";
import ApiError  from "@presentation/error-handling/api-error";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();

    res.status(200).json({ message: "ok",});
  });
 
  app.use(router);
  app.use("/admin",adminRouter);
  app.use("/staff", staffRouter);
};
