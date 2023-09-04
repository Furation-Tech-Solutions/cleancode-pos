import { adminRouter } from "@presentation/routes/admin-routes";
import { staffRouter } from "@presentation/routes/staff-routes";
import { inventoryRouter } from "@presentation/routes/inventory-routes";
import { tableRouter } from "@presentation/routes/table-routes";
import { ingredientUnitRouter } from "@presentation/routes/ingredientUnit-routes";
import { areaRouter } from "@presentation/routes/area-route";
import { ingredientCategoryRouter } from "@presentation/routes/ingredientCategory-routes";
import { ingredientRouter } from "@presentation/routes/ingredient-routes";
import { deliveryPartnerRouter } from "@presentation/routes/deliveryPartner-routes";
import { foodCategoryRouter } from "@presentation/routes/foodCategory-routes";
import { kitchenRouter } from "@presentation/routes/kitchen-routes";
import {outletRouter } from "@presentation/routes/outlet-route";
import { type Express, Router } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { companyRouter } from "@presentation/routes/company-route";
import { cuisineRouter } from "@presentation/routes/cuisine-routes";
import { foodMenuRouter } from "@presentation/routes/foodMenu-routes";
import { modifierRouter } from "@presentation/routes/modifier-routes";
import { veriationsRouter } from "@presentation/routes/veriations-route";
import { preMadeFoodRouter } from "@presentation/routes/preMadeFood-routes";
import { foodComboRouter } from "@presentation/routes/foodCombo-routes";
import { supplierDuePaymentOutletRouter } from "@presentation/routes/supplierDuePaymentOutlet-routes";
import { supplierRouter } from "@presentation/routes/supplier-routes";
import { paymentRouter } from "@presentation/routes/payment-routes";
import { expenseRouter } from "@presentation/routes/expense-routes";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();
    res.status(200).json({ message: "ok" });
  });

  app.use("/table", tableRouter);
  app.use("/ingredientUnit", ingredientUnitRouter);
  app.use("/foodCategory", foodCategoryRouter);
  app.use("/area", areaRouter)
  app.use("/kitchen", kitchenRouter)

  app.use("/ingredientCategory", ingredientCategoryRouter);
  app.use("/ingredient", ingredientRouter);
  app.use("/deliveryPartner", deliveryPartnerRouter);
  app.use("/admin",adminRouter);
  app.use("/outlet", outletRouter);
  app.use("/company", companyRouter);
  app.use(router);
  app.use("/staff", staffRouter);
  app.use("/inventory", inventoryRouter);
  app.use("/cuisine", cuisineRouter);
  app.use("/foodMenu", foodMenuRouter);
  app.use("/modifier", modifierRouter);
  app.use("/veriations", veriationsRouter);
  app.use("/preMadeFood", preMadeFoodRouter);
  app.use("/foodCombo", foodComboRouter);
  app.use("/supplierDuePaymentOutlet", supplierDuePaymentOutletRouter);
  app.use("/supplier", supplierRouter);
  app.use("/payment", paymentRouter);
  app.use("/expense", expenseRouter);
};
