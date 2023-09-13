import { NextFunction, Request, Response } from "express";
import {
  PaymentModel,
  PaymentEntity,
  PaymentMapper,
} from "@domain/payment/entities/payment";
import { CreatePaymentUsecase } from "@domain/payment/usecases/create-payment";
import { DeletePaymentUsecase } from "@domain/payment/usecases/delete-payment";
import { GetPaymentByIdUsecase } from "@domain/payment/usecases/get-payment-by-id";
import { UpdatePaymentUsecase } from "@domain/payment/usecases/update-payment";
import { GetAllPaymentsUsecase } from "@domain/payment/usecases/get-all-payments";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class PaymentService {
  private readonly createPaymentUsecase: CreatePaymentUsecase;
  private readonly deletePaymentUsecase: DeletePaymentUsecase;
  private readonly getPaymentByIdUsecase: GetPaymentByIdUsecase;
  private readonly updatePaymentUsecase: UpdatePaymentUsecase;
  private readonly getAllPaymentsUsecase: GetAllPaymentsUsecase;

  constructor(
    createPaymentUsecase: CreatePaymentUsecase,
    deletePaymentUsecase: DeletePaymentUsecase,
    getPaymentByIdUsecase: GetPaymentByIdUsecase,
    updatePaymentUsecase: UpdatePaymentUsecase,
    getAllPaymentsUsecase: GetAllPaymentsUsecase
  ) {
    this.createPaymentUsecase = createPaymentUsecase;
    this.deletePaymentUsecase = deletePaymentUsecase;
    this.getPaymentByIdUsecase = getPaymentByIdUsecase;
    this.updatePaymentUsecase = updatePaymentUsecase;
    this.getAllPaymentsUsecase = getAllPaymentsUsecase;
  }

  async createPayment(req: Request, res: Response): Promise<void> {
      
      // Extract payment data from the request body and convert it to PaymentModel
      const paymentData: PaymentModel = PaymentMapper.toModel(req.body);

      // Call the createPaymentUsecase to create the payment
      const newPayment: Either<ErrorClass, PaymentEntity> = await this.createPaymentUsecase.execute(
        paymentData
      );

      newPayment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PaymentEntity) =>{
          const responseData = PaymentMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deletePayment(req: Request, res: Response): Promise<void> {
    
      const paymentId: string = req.params.paymentId;
    

      const updatedPaymentEntity: PaymentEntity = PaymentMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdatePaymentUsecase to update the Payment
      const updatedPayment: Either<ErrorClass, PaymentEntity> = await this.updatePaymentUsecase.execute(
        paymentId,
        updatedPaymentEntity
      );

      updatedPayment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PaymentEntity) =>{
          const responseData = PaymentMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getPaymentById(req: Request, res: Response): Promise<void> {
      const paymentId: string = req.params.paymentId;

      // Call the GetPaymentByIdUsecase to get the payment by ID
      const payment: Either<ErrorClass, PaymentEntity | null> = await this.getPaymentByIdUsecase.execute(
        paymentId
      );

      payment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PaymentEntity | null) =>{
          const responseData = PaymentMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updatePayment(req: Request, res: Response): Promise<void> {
    
      const paymentId: string = req.params.paymentId;
      const paymentData: PaymentModel = req.body;

      // Get the existing Payment by ID
      const existingPayment: Either<ErrorClass, PaymentEntity | null> =
        await this.getPaymentByIdUsecase.execute(paymentId);

      if (!existingPayment) {
        // If payment is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert paymentfData from PaymentModel to PaymentEntity using PaymentMapper
      const updatedPaymentEntity: PaymentEntity = PaymentMapper.toEntity(
        paymentData,
        true,
      );

      // Call the UpdatePaymentUsecase to update the Payment
      const updatedPayment: Either<ErrorClass, PaymentEntity> = await this.updatePaymentUsecase.execute(
        paymentId,
        updatedPaymentEntity
      );

      updatedPayment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PaymentEntity) =>{
          const responseData = PaymentMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllPayments(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllPaymentsUsecase to get all Payments
      const payments: Either<ErrorClass, PaymentEntity[]> = await this.getAllPaymentsUsecase.execute();

      payments.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: PaymentEntity[]) => {
            // Filter out payments with del_status set to "Deleted"
            const nonDeletedPayments = result.filter((payment) => payment.del_status !== false);

            // Convert non-deleted payments from an array of PaymentEntity to an array of plain JSON objects using PaymentMapper
            const responseData = nonDeletedPayments.map((payment) => PaymentMapper.toEntity(payment));
            return res.json(responseData);
        }
    );
  }
}
