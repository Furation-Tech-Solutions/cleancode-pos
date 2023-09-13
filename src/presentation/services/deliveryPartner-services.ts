import { NextFunction, Request, Response } from "express";
import {
  DeliveryPartnerModel,
  DeliveryPartnerEntity,
  DeliveryPartnerMapper,
} from "@domain/deliveryPartner/entities/deliveryPartner";
import { CreateDeliveryPartnerUsecase } from "@domain/deliveryPartner/usecases/create-deliveryPartner";
import { DeleteDeliveryPartnerUsecase } from "@domain/deliveryPartner/usecases/delete-deliveryPartner";
import { GetDeliveryPartnerByIdUsecase } from "@domain/deliveryPartner/usecases/get-deliveryPartner-by-id";
import { UpdateDeliveryPartnerUsecase } from "@domain/deliveryPartner/usecases/update-deliveryPartner";
import { GetAllDeliveryPartnersUsecase } from "@domain/deliveryPartner/usecases/get-all-deliveryPartners";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class DeliveryPartnerService {
  private readonly createDeliveryPartnerUsecase: CreateDeliveryPartnerUsecase;
  private readonly deleteDeliveryPartnerUsecase: DeleteDeliveryPartnerUsecase;
  private readonly getDeliveryPartnerByIdUsecase: GetDeliveryPartnerByIdUsecase;
  private readonly updateDeliveryPartnerUsecase: UpdateDeliveryPartnerUsecase;
  private readonly getAllDeliveryPartnersUsecase: GetAllDeliveryPartnersUsecase;

  constructor(
    createDeliveryPartnerUsecase: CreateDeliveryPartnerUsecase,
    deleteDeliveryPartnerUsecase: DeleteDeliveryPartnerUsecase,
    getDeliveryPartnerByIdUsecase: GetDeliveryPartnerByIdUsecase,
    updateDeliveryPartnerUsecase: UpdateDeliveryPartnerUsecase,
    getAllDeliveryPartnersUsecase: GetAllDeliveryPartnersUsecase
  ) {
    this.createDeliveryPartnerUsecase = createDeliveryPartnerUsecase;
    this.deleteDeliveryPartnerUsecase = deleteDeliveryPartnerUsecase;
    this.getDeliveryPartnerByIdUsecase = getDeliveryPartnerByIdUsecase;
    this.updateDeliveryPartnerUsecase = updateDeliveryPartnerUsecase;
    this.getAllDeliveryPartnersUsecase = getAllDeliveryPartnersUsecase;
  }

  
  async createDeliveryPartner(req: Request, res: Response): Promise<void> {
      
      // Extract DeliveryPartner data from the request body and convert it to DeliveryPartnerModel
      const deliveryPartnerData: DeliveryPartnerModel = DeliveryPartnerMapper.toModel(req.body);

      // Call the CreateDeliveryPartnerUsecase to create the DeliveryPartner
      const newDeliveryPartner: Either<ErrorClass, DeliveryPartnerEntity> = await this.createDeliveryPartnerUsecase.execute(
        deliveryPartnerData
      );

      newDeliveryPartner.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: DeliveryPartnerEntity) =>{
          const responseData = DeliveryPartnerMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteDeliveryPartner(req: Request, res: Response): Promise<void> {
      const deliveryPartnerId: string = req.params.deliveryPartnerId;

      // Call the DeleteDeliveryPartnerUsecase to delete the deliveryPartner
      const updatedDeliveryPartnerEntity: DeliveryPartnerEntity = DeliveryPartnerMapper.toEntity(
        { del_status: false },
        true
      );

      // Call the UpdateDeliveryPartnerUsecase to update the DeliveryPartner
      const updatedDeliveryPartner: Either<ErrorClass, DeliveryPartnerEntity> = await this.updateDeliveryPartnerUsecase.execute(
        deliveryPartnerId,
        updatedDeliveryPartnerEntity
      );

      updatedDeliveryPartner.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: DeliveryPartnerEntity) =>{
          const responseData = DeliveryPartnerMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getDeliveryPartnerById(req: Request, res: Response): Promise<void> {
      const deliveryPartnerId: string = req.params.deliveryPartnerId;

      // Call the GetDeliveryPartnerByIdUsecase to get the DeliveryPartner by ID
      const deliveryPartner: Either<ErrorClass, DeliveryPartnerEntity | null> = await this.getDeliveryPartnerByIdUsecase.execute(
        deliveryPartnerId
      );

      deliveryPartner.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: DeliveryPartnerEntity | null) =>{
          const responseData = DeliveryPartnerMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
        
  }

  async updateDeliveryPartner(req: Request, res: Response): Promise<void> {
      const deliveryPartnerId: string = req.params.deliveryPartnerId;
      const deliveryPartnerData: DeliveryPartnerModel = req.body;

      // Get the existing DeliveryPartner by ID
      const existingDeliveryPartner: Either<ErrorClass, DeliveryPartnerEntity | null> =
        await this.getDeliveryPartnerByIdUsecase.execute(deliveryPartnerId);

      if (!existingDeliveryPartner) {
        // If deliveryPartner is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert DeliveryPartnerData from DeliveryPartnerModel to DeliveryPartnerEntity using DeliveryPartnerMapper
      const updatedDeliveryPartnerEntity: DeliveryPartnerEntity = DeliveryPartnerMapper.toEntity(
        deliveryPartnerData,
        true,
        // existingDeliveryPartner
      );

      // Call the UpdateDeliveryPartnerUsecase to update the deliveryPartner
      const updatedDeliveryPartner:  Either<ErrorClass, DeliveryPartnerEntity> = await this.updateDeliveryPartnerUsecase.execute(
        deliveryPartnerId,
        updatedDeliveryPartnerEntity
      );

      updatedDeliveryPartner.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: DeliveryPartnerEntity) =>{
          const responseData = DeliveryPartnerMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllDeliveryPartners(req: Request, res: Response, next:NextFunction): Promise<void> {
      // Call the GetAllDeliveryPartnersUsecase to get all deliveryPartners
      const deliveryPartners: Either<ErrorClass, DeliveryPartnerEntity[]> = await this.getAllDeliveryPartnersUsecase.execute();

      deliveryPartners.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: DeliveryPartnerEntity[]) => {
          // Filter out tables with del_status set to "Deleted"
          const nonDeletedDeliveryPartner = result.filter((deliveryPartner) => deliveryPartner.del_status !== false);

          // Convert tables from an array of TableEntity to an array of plain JSON objects using TableMapper
          const responseData = nonDeletedDeliveryPartner.map((DeliveryPartner) => DeliveryPartnerMapper.toEntity(DeliveryPartner));
          return res.json(responseData);
        }
      )
  }
}