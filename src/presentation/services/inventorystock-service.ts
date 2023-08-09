import { NextFunction, Request, Response } from "express";
import { CreateInventorystockUsecase } from "@domain/inventoryStock/usecases/create-inventorystock";
import { DeleteInventortstockUsecase } from "@domain/inventoryStock/usecases/delete-inventorystock";
import { GetAllInventorystockUsecase } from "@domain/inventoryStock/usecases/get-all-inventorystock";
import { GetInventorystockByIdUsecase } from "@domain/inventoryStock/usecases/get-inventorystock-by-id";
import { UpdateInventorystockUsecase } from "@domain/inventoryStock/usecases/update-inventorystock";
import ApiError from "@presentation/error-handling/api-error";
import { InventorystockEntity, InventorystockMapper, InventorystockModel } from "@domain/inventoryStock/entities/inventorystock";


export class InventorystockServices {
    private readonly createInventorystockusecases : CreateInventorystockUsecase;
    private readonly deleteInventorystockusecases : DeleteInventortstockUsecase;
    private readonly updateInventorystockusecases : UpdateInventorystockUsecase;
    private readonly getAllInventorystockusecases : GetAllInventorystockUsecase;
    private readonly getcreateInventorystockByIdusecases : GetInventorystockByIdUsecase;

    constructor (
        createInventorystockusecases : CreateInventorystockUsecase,
        deleteInventorystockusecases : DeleteInventortstockUsecase,
        updateInventorystockusecases : UpdateInventorystockUsecase,
        getAllInventorystockusecases : GetAllInventorystockUsecase,
        getcreateInventorystockByIdusecases : GetInventorystockByIdUsecase
    ) {
        this.createInventorystockusecases= createInventorystockusecases;
        this.deleteInventorystockusecases= deleteInventorystockusecases;
        this.updateInventorystockusecases= updateInventorystockusecases;
        this.getAllInventorystockusecases= getAllInventorystockusecases;
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
    }
}