// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { PaymentService } from "@presentation/services/payment-services";
import { PaymentDataSourceImpl } from "@data/payment/datasource/payment-data-source";
import { PaymentRepositoryImpl } from "@data/payment/repositories/payment-repository-impl";
import { CreatePayment } from "@domain/payment/usecases/create-payment";
import { DeletePayment } from "@domain/payment/usecases/delete-payment";
import { GetPaymentById } from "@domain/payment/usecases/get-payment-by-id";
import { GetAllPayments } from "@domain/payment/usecases/get-all-payments";
import { UpdatePayment } from "@domain/payment/usecases/update-payment";
import validatePaymentMiddleware from "@presentation/middlewares/payment/validation-middleware";

// Create an instance of the PaymentDataSourceImpl and pass the mongoose connection
const paymentDataSource = new PaymentDataSourceImpl(mongoose.connection);

// Create an instance of the PaymentRepositoryImpl and pass the PaymentDataSourceImpl
const paymentRepository = new PaymentRepositoryImpl(paymentDataSource);

// Create instances of the required use cases and pass the PaymentRepositoryImpl
const createPaymentUsecase = new CreatePayment(paymentRepository);
const deletePaymentUsecase = new DeletePayment(paymentRepository);
const getPaymentByIdUsecase = new GetPaymentById(paymentRepository);
const updatePaymentUsecase = new UpdatePayment(paymentRepository);
const getAllPaymentsUsecase = new GetAllPayments(paymentRepository);

// Initialize PaymentService and inject required dependencies
const paymentService = new PaymentService(
  createPaymentUsecase,
  deletePaymentUsecase,
  getPaymentByIdUsecase,
  updatePaymentUsecase,
  getAllPaymentsUsecase
);

// Create an Express router
export const paymentRouter = Router();

// Route handling for creating a new payment
paymentRouter.post("/new", validatePaymentMiddleware, paymentService.createPayment.bind(paymentService));

// Route handling for getting an payment by ID
paymentRouter.get("/show/:paymentId", paymentService.getPaymentById.bind(paymentService));

// Route handling for updating an payment by ID
paymentRouter.put("/update/:paymentId", paymentService.updatePayment.bind(paymentService));

// Route handling for deleting an payment by ID
paymentRouter.delete("/delete/:paymentId", paymentService.deletePayment.bind(paymentService));

// Route handling for getting all payments
paymentRouter.get("/list", paymentService.getAllPayments.bind(paymentService));
