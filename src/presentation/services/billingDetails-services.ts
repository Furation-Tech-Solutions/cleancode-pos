import { NextFunction, Request, Response } from "express";
import {
  BillingDetailsModel,
  BillingDetailsEntity,
  BillingDetailsMapper,
} from "@domain/billingDetails/entities/billingDetails";
import { CreateBillingDetailsUsecase } from "@domain/billingDetails/usecases/create-billingDetails";
import { DeleteBillingDetailsUsecase } from "@domain/billingDetails/usecases/delete-billingDetails";
import { GetBillingDetailsByIdUsecase } from "@domain/billingDetails/usecases/get-billingDetails-by-id";
import { UpdateBillingDetailsUsecase } from "@domain/billingDetails/usecases/update-billingDetails";
import { GetAllBillingDetailssUsecase } from "@domain/billingDetails/usecases/get-all-billingDetails";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { AutoBillingNumber } from "@presentation/middlewares/billingDetails/billNumber";

export class BillingDetailsService {
  private readonly createBillingDetailsUsecase: CreateBillingDetailsUsecase;
  private readonly deleteBillingDetailsUsecase: DeleteBillingDetailsUsecase;
  private readonly getBillingDetailsByIdUsecase: GetBillingDetailsByIdUsecase;
  private readonly updateBillingDetailsUsecase: UpdateBillingDetailsUsecase;
  private readonly getAllBillingDetailssUsecase: GetAllBillingDetailssUsecase;

  constructor(
    createBillingDetailsUsecase: CreateBillingDetailsUsecase,
    deleteBillingDetailsUsecase: DeleteBillingDetailsUsecase,
    getBillingDetailsByIdUsecase: GetBillingDetailsByIdUsecase,
    updateBillingDetailsUsecase: UpdateBillingDetailsUsecase,
    getAllBillingDetailssUsecase: GetAllBillingDetailssUsecase
  ) {
    this.createBillingDetailsUsecase = createBillingDetailsUsecase;
    this.deleteBillingDetailsUsecase = deleteBillingDetailsUsecase;
    this.getBillingDetailsByIdUsecase = getBillingDetailsByIdUsecase;
    this.updateBillingDetailsUsecase = updateBillingDetailsUsecase;
    this.getAllBillingDetailssUsecase = getAllBillingDetailssUsecase;
  }

  async createBillingDetails(req: Request, res: Response): Promise<void> {
      // Generate the billing number as a string
    const billNumber: string = AutoBillingNumber.generateNumberBilling(0);
  
    // Ensure req.body exists and create an 'billing' property
    req.body = req.body || {};
    req.body.billNumber = billNumber;
  
    // Extract billing data from the request body and convert it to BillingModel
    const billingData: BillingDetailsModel = BillingDetailsMapper.toModel(req.body);
  
    // Call the createBillingUsecase to create the billing
    const newBilling: Either<ErrorClass, BillingDetailsEntity> = await this.createBillingDetailsUsecase.execute(billingData);
  
    newBilling.cata(
      (error: ErrorClass) => {
        // Handle the error using status and message from the error object
        res.status(error.status).json({ error: error.message });
      },
      (result: BillingDetailsEntity) => {
        // Map the result to response data
        const responseData = BillingDetailsMapper.toEntity(result, true);
        res.json(responseData);
      }
    );
  }

  async deleteBillingDetails(req: Request, res: Response): Promise<void> {
    
      const billingDetailsId: string = req.params.billingDetailsId;
    

      const updatedBillingDetailsEntity: BillingDetailsEntity = BillingDetailsMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateBillingDetailsUsecase to update the billingDetails
      const updatedBillingDetails: Either<ErrorClass, BillingDetailsEntity> = await this.updateBillingDetailsUsecase.execute(
        billingDetailsId,
        updatedBillingDetailsEntity
      );

      updatedBillingDetails.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: BillingDetailsEntity) =>{
          const responseData = BillingDetailsMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getBillingDetailsById(req: Request, res: Response): Promise<void> {
      const billingDetailsId: string = req.params.billingDetailsId;

      // Call the GetBillingDetailsByIdUsecase to get the billingDetails by ID
      const billingDetails: Either<ErrorClass, BillingDetailsEntity | null> = await this.getBillingDetailsByIdUsecase.execute(
        billingDetailsId
      );

      billingDetails.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: BillingDetailsEntity | null) =>{
          const responseData = BillingDetailsMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateBillingDetails(req: Request, res: Response): Promise<void> {
    
      const billingDetailsId: string = req.params.billingDetailsId;
      const billingDetailsData: BillingDetailsModel = req.body;

      // Get the existing billingDetails by ID
      const existingBillingDetails: Either<ErrorClass, BillingDetailsEntity | null> =
        await this.getBillingDetailsByIdUsecase.execute(billingDetailsId);

      if (!existingBillingDetails) {
        // If billingDetails is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert billingDetailsData from BillingDetailsModel to BillingDetailsEntity using BillingDetailsMapper
      const updatedBillingDetailsEntity: BillingDetailsEntity = BillingDetailsMapper.toEntity(
        billingDetailsData,
        true,
      );

      // Call the UpdateBillingDetailsUsecase to update the billingDetails
      const updatedBillingDetails: Either<ErrorClass, BillingDetailsEntity> = await this.updateBillingDetailsUsecase.execute(
        billingDetailsId,
        updatedBillingDetailsEntity
      );

      updatedBillingDetails.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: BillingDetailsEntity) =>{
          const responseData = BillingDetailsMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllBillingDetailss(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllBillingDetailssUsecase to get all billingDetailss
      const billingDetailss: Either<ErrorClass, BillingDetailsEntity[]> = await this.getAllBillingDetailssUsecase.execute();

      billingDetailss.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: BillingDetailsEntity[]) => {
            // Filter out billingDetailss with del_status set to "Deleted"
            const nonDeletedBillingDetailss = result.filter((billingDetails) => billingDetails.del_status !== false);

            // Convert non-deleted billingDetailss from an array of BillingDetailsEntity to an array of plain JSON objects using BillingDetailsMapper
            const responseData = nonDeletedBillingDetailss.map((billingDetails) => BillingDetailsMapper.toEntity(billingDetails));
            return res.json(responseData);
        }
    );
  }
}
