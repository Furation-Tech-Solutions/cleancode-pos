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
    }
    async deleteDeliverypartner (req : Request, res : Response) : Promise<void> {
        const deliverypartnerId : string= req.params.deliverypartnerId;
        const deletedDeliverypartner: Either<ErrorClass, void> =
        await this.deleteDeliverypartnerUsecases.execute(deliverypartnerId);

        deletedDeliverypartner.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Delivery partner deleted successfully." });
            }
        );
        
    }
    async getAllDeliverypartner (req: Request, res: Response) : Promise<void> {
        const deliverypartners : Either<ErrorClass, DeliverypartnerEntity[]> = await this.getAllDeliverypartnerUsecases.execute();
        deliverypartners.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: DeliverypartnerEntity[]) => {
                const resdata = result.map((deliverypartner) =>
                DeliverypartnerMapper.toModel(deliverypartner)
              );
              return res.json(resdata);
            }
        )
    }
    async getDeliverypartnerById (req: Request, res: Response) : Promise<void> {
        const deliverypartnerId : string = req.params.deliverypartnerId;
        const deliverypartner : Either<ErrorClass, DeliverypartnerEntity> = 
        await this.getDeliverypartnerByIdusecases.execute(deliverypartnerId);
        deliverypartner.cata(
            (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),
            (result: DeliverypartnerEntity) => {
              const resdata = DeliverypartnerMapper.toModel(result);
              return res.json(resdata);
            }
        );
    }
    async updateDeliverypartner (req: Request, res: Response) : Promise<void> {
        const deliverypartnerId: string = req.params.deliverypartnerId;
        const deliverypartnerData: DeliverypartnerModel = req.body;

        const existingDeliverypartner: Either<ErrorClass, DeliverypartnerEntity> =
        await this.getDeliverypartnerByIdusecases.execute(deliverypartnerId);

        existingDeliverypartner.cata(
        (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
        },
        async (existingDeliverypartnerData: DeliverypartnerEntity) => {
            const updatedDeliverypartnerEntity: DeliverypartnerEntity = DeliverypartnerMapper.toEntity(
                deliverypartnerData,
                true,
                existingDeliverypartnerData
            );

            const updatedDeliverypartner: Either<ErrorClass, DeliverypartnerEntity> =
            await this.updateDeliverypartnerUsecases.execute(
                deliverypartnerId,
                updatedDeliverypartnerEntity
            );

            updatedDeliverypartner.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            (result: DeliverypartnerEntity) => {
                const resData = DeliverypartnerMapper.toEntity(result, true);
                res.json(resData);
            }
            );
        }
        );
    }
}