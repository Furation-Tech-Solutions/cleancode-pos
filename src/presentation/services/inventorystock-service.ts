import { NextFunction, Request, Response } from "express";
import { CreateInventorystockUsecase } from "@domain/inventoryStock/usecases/create-inventorystock";
import { DeleteInventortstockUsecase } from "@domain/inventoryStock/usecases/delete-inventorystock";
import { GetAllInventorystockUsecase } from "@domain/inventoryStock/usecases/get-all-inventorystock";
import { GetInventorystockByIdUsecase } from "@domain/inventoryStock/usecases/get-inventorystock-by-id";
import { UpdateInventorystockUsecase } from "@domain/inventoryStock/usecases/update-inventorystock";
import ApiError from "@presentation/error-handling/api-error";
import { InventorystockEntity, InventorystockMapper, InventorystockModel } from "@domain/inventoryStock/entities/inventoryStock";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class InventorystockServices {
    private readonly createInventorystockusecases : CreateInventorystockUsecase;
    private readonly deleteInventorystockusecases : DeleteInventortstockUsecase;
    private readonly updateInventorystockusecases : UpdateInventorystockUsecase;
    private readonly getAllInventorystockusecases : GetAllInventorystockUsecase;
    private readonly getInventorystockByIdusecases : GetInventorystockByIdUsecase;

    constructor (
        createInventorystockusecases : CreateInventorystockUsecase,
        deleteInventorystockusecases : DeleteInventortstockUsecase,
        updateInventorystockusecases : UpdateInventorystockUsecase,
        getAllInventorystockusecases : GetAllInventorystockUsecase,
        getInventorystockByIdusecases : GetInventorystockByIdUsecase
    ) {
        this.createInventorystockusecases= createInventorystockusecases;
        this.deleteInventorystockusecases= deleteInventorystockusecases;
        this.updateInventorystockusecases= updateInventorystockusecases;
        this.getAllInventorystockusecases= getAllInventorystockusecases;
        this.getInventorystockByIdusecases= getInventorystockByIdusecases
    }
    async createInventorystock (req: Request, res: Response) : Promise<void>{
        const inventorystockData : InventorystockModel = InventorystockMapper.toModel(req.body);
        const newInventorystockData: Either<ErrorClass, InventorystockEntity> = 
        await this.createInventorystockusecases.execute(inventorystockData);

        newInventorystockData.cata(
            (error : ErrorClass) => 
            res.status(error.status).json({error : error.message}),
            (result : InventorystockEntity) => {
                const responseData = InventorystockMapper.toEntity(result, true);
                return res.json(responseData);
            }
        )
    }

    async deleteInventorystock (req: Request, res: Response) : Promise<void>{
        const inventorystockId : string= req.params.inventorystockId;
        const deletedInventorystock: Either<ErrorClass, void> =
        await this.deleteInventorystockusecases.execute(inventorystockId);

        deletedInventorystock.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Inventory partner deleted successfully." });
            }
        );
    }

    async updateInventorystock (req: Request, res: Response) : Promise<void> {
        const inventorystockId: string = req.params.inventorystockId;
        const inventorystockData: InventorystockModel = req.body;

        const existingInventorystock: Either<ErrorClass, InventorystockEntity> =
        await this.getInventorystockByIdusecases.execute(inventorystockId);

        existingInventorystock.cata(
        (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
        },
        async (existingInventorystockData: InventorystockEntity) => {
            const updatedInventorystockEntity: InventorystockEntity = InventorystockMapper.toEntity(
                inventorystockData,
                true,
                existingInventorystockData
            );

            const updatedInventorystock: Either<ErrorClass, InventorystockEntity> =
            await this.updateInventorystockusecases.execute(
                inventorystockId,
                updatedInventorystockEntity
            );

            updatedInventorystock.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            (result: InventorystockEntity) => {
                const resData = InventorystockMapper.toEntity(result, true);
                res.json(resData);
            }
            );
        }
        );
    }

    async getAllInventoystock (req: Request, res: Response, next: NextFunction) : Promise<void> {
        const inventorystocks : Either<ErrorClass, InventorystockEntity[]> = await this.getAllInventorystockusecases.execute();
        inventorystocks.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: InventorystockEntity[]) => {
                const resdata = result.map((inventorystock) =>
                InventorystockMapper.toModel(inventorystock)
              );
              return res.json(resdata);
            }
        )
    }

    async getInventorystockById (req: Request, res: Response) : Promise<void> {
        const inventorystockId : string = req.params.inventorystockId;
        const inventorystock : Either<ErrorClass, InventorystockEntity> = 
        await this.getInventorystockByIdusecases.execute(inventorystockId);
        inventorystock.cata(
            (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),
            (result: InventorystockEntity) => {
              const resdata = InventorystockMapper.toModel(result);
              return res.json(resdata);
            }
        );
    }
}