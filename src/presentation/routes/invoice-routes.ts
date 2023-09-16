// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InvoiceService } from "@presentation/services/invoice-services";
import { InvoiceDataSourceImpl } from "@data/invoice/datasources/invoice-data-source";
import { InvoiceRepositoryImpl } from "@data/invoice/repositories/invoice-repositories-impl";
import { CreateInvoice } from "@domain/invoice/usecases/create-invoice";
import { DeleteInvoice } from "@domain/invoice/usecases/delete-invoice";
import { GetInvoiceById } from "@domain/invoice/usecases/get-invoice-by-id";
import { GetAllInvoices } from "@domain/invoice/usecases/get-all-invoice";
import { UpdateInvoice } from "@domain/invoice/usecases/update-invoice";
import validateInvoiceMiddleware from "@presentation/middlewares/invoice/validation-middleware";

// const dbURL =
//   "mongodb+srv://mongodb+srv://satansharma:satansharma@cluster0.ncc9mtu.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual MongoDB connection URL

// // Set up the required options for the connection
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "myDatabase", // Replace with the name of your database
//   // Other options like user and password can also be added if necessary
// };

// // Create the mongoose connection
// mongoose.connect(dbURL, dbOptions).then(() => {
//   console.log("Connected to MongoDB successfully!");
// });

// Create an instance of the InvoiceDataSourceImpl and pass the mongoose connection
const invoiceDataSource = new InvoiceDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const invoiceRepository = new InvoiceRepositoryImpl(invoiceDataSource);

// Create instances of the required use cases and pass the InvoiceRepositoryImpl
const createInvoiceUsecase = new CreateInvoice(invoiceRepository);
const deleteInvoiceUsecase = new DeleteInvoice(invoiceRepository);
const getInvoiceByIdUsecase = new GetInvoiceById(invoiceRepository);
const updateInvoiceUsecase = new UpdateInvoice(invoiceRepository);
const getAllInvoicesUsecase = new GetAllInvoices(invoiceRepository);

// Initialize InvoiceService and inject required dependencies
const invoiceService = new InvoiceService(
  createInvoiceUsecase,
  deleteInvoiceUsecase,
  getInvoiceByIdUsecase,
  updateInvoiceUsecase,
  getAllInvoicesUsecase
);

// Create an Express router
export const invoiceRouter = Router();

// Route handling for creating a new invoice
invoiceRouter.post("/new", validateInvoiceMiddleware, invoiceService.createInvoice.bind(invoiceService));

// Route handling for getting an Invoice by ID
invoiceRouter.get("/show/:invoiceId", invoiceService.getInvoiceById.bind(invoiceService));

// Route handling for updating an invoice by ID
invoiceRouter.put("/update/:invoiceId", invoiceService.updateInvoice.bind(invoiceService));

// Route handling for deleting an invoice by ID
invoiceRouter.delete("/delete/:invoiceId", invoiceService.deleteInvoice.bind(invoiceService));

// Route handling for getting all invoices
invoiceRouter.get("/list", invoiceService.getAllInvoices.bind(invoiceService));
