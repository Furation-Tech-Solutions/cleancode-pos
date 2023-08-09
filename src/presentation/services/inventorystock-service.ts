import { NextFunction, Request, Response } from "express";
import { CreateInventorystockUsecase } from "@domain/inventoryStock/usecases/create-inventorystock";
import { DeleteInventortstockUsecase } from "@domain/inventoryStock/usecases/delete-inventorystock";
import { GetAllInventorystockUsecase } from "@domain/inventoryStock/usecases/get-all-inventorystock";
import { GetInventorystockByIdUsecase } from "@domain/inventoryStock/usecases/get-inventorystock-by-id";
import { UpdateInventorystockUsecase } from "@domain/inventoryStock/usecases/update-inventorystock";
import ApiError from "@presentation/error-handling/api-error";
import { InventorystockEntity, InventorystockMapper, InventorystockModel } from "@domain/inventoryStock/entities/inventoryStock";
<<<<<<< HEAD

=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a

export class InventorystockServices {
    private readonly createInventorystockusecases : CreateInventorystockUsecase;
    private readonly deleteInventorystockusecases : DeleteInventortstockUsecase;
    private readonly updateInventorystockusecases : UpdateInventorystockUsecase;
    private readonly getAllInventorystockusecases : GetAllInventorystockUsecase;
<<<<<<< HEAD
    private readonly getcreateInventorystockByIdusecases : GetInventorystockByIdUsecase;
=======
    private readonly getInventorystockByIdusecases : GetInventorystockByIdUsecase;
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a

    constructor (
        createInventorystockusecases : CreateInventorystockUsecase,
        deleteInventorystockusecases : DeleteInventortstockUsecase,
        updateInventorystockusecases : UpdateInventorystockUsecase,
        getAllInventorystockusecases : GetAllInventorystockUsecase,
<<<<<<< HEAD
        getcreateInventorystockByIdusecases : GetInventorystockByIdUsecase
=======
        getInventorystockByIdusecases : GetInventorystockByIdUsecase
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
    ) {
        this.createInventorystockusecases= createInventorystockusecases;
        this.deleteInventorystockusecases= deleteInventorystockusecases;
        this.updateInventorystockusecases= updateInventorystockusecases;
        this.getAllInventorystockusecases= getAllInventorystockusecases;
<<<<<<< HEAD
        this.getcreateInventorystockByIdusecases= getcreateInventorystockByIdusecases
    }
    async createInventorystock (req: Request, res: Response) : Promise<void>{
        try {
            const InventorystockData : InventorystockModel = InventorystockMapper.toModel(req.body);
            const newInventorystockData: InventorystockEntity = 
            await this.createInventorystockusecases.execute(InventorystockData);
            const responseData= InventorystockMapper.toEntity(newInventorystockData, true);
            res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            }
            const err = ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }

    async deleteInventorystock (req: Request, res: Response) : Promise<void>{
        try {
            const inventorystockId= req.params.inventorystockId;
            await this.deleteInventorystockusecases.execute(inventorystockId);
            res.json({message : "Inventory partner deleted successfully"})
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            }
            const err = ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }

    async updateInventorystock (req: Request, res: Response) : Promise<void> {
        try {
            const inventorystockId : string = req.params.inventorystockId;
            const InventorystockData : InventorystockModel = req.body;
            const existingInventorystock : InventorystockEntity | null =
            await this.getcreateInventorystockByIdusecases.execute(inventorystockId);
            if(!existingInventorystock){
                ApiError.notFound();
                return;
            }

            const updatedInventorystockEntity : InventorystockEntity = InventorystockMapper.toEntity(
                InventorystockData,
                true,
                existingInventorystock
            )

            const updatedInventorystock : InventorystockEntity = 
            await this.updateInventorystockusecases.execute(inventorystockId, updatedInventorystockEntity);

            const responseData= InventorystockMapper.toModel(updatedInventorystock);
            res.json(responseData);

        } catch (error) {
            if(error instanceof ApiError) {
                res.status(error.status).json({ error : error.message });
            }
            const err= ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }

    async getAllInventoystock (req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const inventorystocks : InventorystockEntity[] =
            await this.getAllInventorystockusecases.execute();
            const responseData= inventorystocks.map((inventorystock)=>
                InventorystockMapper.toEntity(inventorystock)
            )
            res.json(responseData);
        } catch (error) {
            if(error instanceof ApiError) {
                res.status(error.status).json({ error : error.message });
            }
            const err= ApiError.internalError();
            res.status(err.status).json(err.message);
        }
    }

    async getInventorystockById (req: Request, res: Response) : Promise<void> {
        try {
            const inventorystockId : string = req.params.inventorystockId;
            const inventorystock : InventorystockEntity | null = 
            await this.getcreateInventorystockByIdusecases.execute(inventorystockId);
            if(inventorystock){
                const responseData= InventorystockMapper.toModel(inventorystock);
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
=======
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
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
    }
}