import { Request, Response } from "express";
import { DeliverypartnerEntity, DeliverypartnerMapper, DeliverypartnerModel } from "@domain/deliverypartner/entities/deliverypartner";
import { CreateDeliverypartnerUsecase } from "@domain/deliverypartner/usecases/create-deliverypartner";
import { DeleteDeliverypartnerUsecase } from "@domain/deliverypartner/usecases/delete-deliverypartner";
import { GetAllDeliverypartnerUsecase } from "@domain/deliverypartner/usecases/get-all-deliverypartner";
import { GetDeliverypartnerByIdUsecase } from "@domain/deliverypartner/usecases/get-deliverypartner-by-id";
import { UpdateDeliverypartnerUsecase } from "@domain/deliverypartner/usecases/update-deliverypartner";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export class DeliverypartnerServices {
    private readonly createDeliverypartnerUsecases  : CreateDeliverypartnerUsecase;
    private readonly deleteDeliverypartnerUsecases  : DeleteDeliverypartnerUsecase;
    private readonly getAllDeliverypartnerUsecases  : GetAllDeliverypartnerUsecase;
    private readonly getDeliverypartnerByIdusecases : GetDeliverypartnerByIdUsecase;
    private readonly updateDeliverypartnerUsecases  : UpdateDeliverypartnerUsecase;

    constructor (
        createDeliverypartnerUsecases  : CreateDeliverypartnerUsecase,
        deleteDeliverypartnerUsecases  : DeleteDeliverypartnerUsecase,
        getAllDeliverypartnerUsecases  : GetAllDeliverypartnerUsecase,
        getDeliverypartnerByIdusecases : GetDeliverypartnerByIdUsecase,
        updateDeliverypartnerUsecases  : UpdateDeliverypartnerUsecase
    ){
        this.createDeliverypartnerUsecases = createDeliverypartnerUsecases,
        this.deleteDeliverypartnerUsecases = deleteDeliverypartnerUsecases,
        this.getAllDeliverypartnerUsecases = getAllDeliverypartnerUsecases,
        this.getDeliverypartnerByIdusecases = getDeliverypartnerByIdusecases,
        this.updateDeliverypartnerUsecases = updateDeliverypartnerUsecases
    }

    async createDeliverypartner (req: Request, res : Response) : Promise<void> {
        try {
            const deliverypartnerData : DeliverypartnerModel = DeliverypartnerMapper.toModel(req.body);
            const newDeliverypartnerData: Either<ErrorClass, DeliverypartnerEntity> = 
            await this.createDeliverypartnerUsecases.execute(deliverypartnerData);
            newDeliverypartnerData.cata(
                (error : ErrorClass) => 
                res.status(error.status).json({error : error.message}),
                (result : DeliverypartnerEntity) => {
                    const responseData = DeliverypartnerMapper.toEntity(result, true);
                    return res.json(responseData);
                }
            )
            // const responseData= DeliverypartnerMapper.toEntity(newDeliverypartnerData, true);
            // res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
              }
              const err = ApiError.internalError();
              res.status(err.status).json(err.message);
        }
    }
    async deleteDeliverypartner (req : Request, res : Response) : Promise<void> {
        try {
            const deliverypartnerId= req.params.deliverypartnerId;
            await this.deleteDeliverypartnerUsecases.execute(deliverypartnerId);
            res.json({ message: "Delivery partner deleted successfully." });
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
              }
              const err = ApiError.internalError();
              res.status(err.status).json(err.message);
        }
    }
    async getAllDeliverypartner (req: Request, res: Response) : Promise<void> {
        try {
            const deliverypartners : DeliverypartnerEntity[] = await this.getAllDeliverypartnerUsecases.execute();
            const responseData = deliverypartners.map((deliverypartner) =>
                DeliverypartnerMapper.toModel(deliverypartner)
            );
            res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            }
            const err = ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }
    async getDeliverypartnerById (req: Request, res: Response) : Promise<void> {
        try {
            const deliverypartnerId : string = req.params.deliverypartnerId;
            const deliverypartner : DeliverypartnerEntity | null = 
            await this.getDeliverypartnerByIdusecases.execute(deliverypartnerId);
            if(deliverypartner){
                const responseData= DeliverypartnerMapper.toModel(deliverypartner);
                res.json(responseData);
            }else {
                ApiError.notFound();
            }
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            }
            const err = ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }
    async updateDeliverypartner (req: Request, res: Response) : Promise<void> {
        try {
            const deliverypartnerId : string = req.params.deliverypartnerId;
            const deliverypartnerData : DeliverypartnerModel = req.body;
            const existingDeliverypartner : DeliverypartnerEntity | null=
            await this.getDeliverypartnerByIdusecases.execute(deliverypartnerId);
            if (!existingDeliverypartner) {
                ApiError.notFound();
                return;
            }
            const updatedDeliverypartnerEntity: DeliverypartnerEntity = DeliverypartnerMapper.toEntity(
                deliverypartnerData,
                true,
                existingDeliverypartner
            );
            const updatedDeliverypartner: DeliverypartnerEntity =
                await this.updateDeliverypartnerUsecases.execute(
                    deliverypartnerId,
                    updatedDeliverypartnerEntity
                );
            const responseData = DeliverypartnerMapper.toModel(updatedDeliverypartner);
            res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
              }
              const err = ApiError.internalError();
              res.status(err.status).json(err.message);
        }
    }
}