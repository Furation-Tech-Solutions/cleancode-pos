import { InventoryPurchaseItemEntity, InventoryPurchaseItemMapper, InventoryPurchaseItemModel } from "@domain/inventoryPurchaseItem/entities/inventoryPurchaseItem";
import { CreateInventoryPurchaseItemUsecase } from "@domain/inventoryPurchaseItem/usecases/create-inventoryPurchaseItem";
import { DeleteInventoryPurchaseItemUsecase } from "@domain/inventoryPurchaseItem/usecases/delete-inventoryPurchaseItem";
import { GetAllInventoryPurchaseItemUsecase } from "@domain/inventoryPurchaseItem/usecases/get-all-inventoryPurchaseItem";
import { GetInventoryPurchaseItemByIdUsecase } from "@domain/inventoryPurchaseItem/usecases/get-inventoryPurchaseItem-by-id";
import { UpdateInventoryPurchaseItemUsecase } from "@domain/inventoryPurchaseItem/usecases/update-deliverypartner";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { Request, Response } from "express";


export class InventoryPurchaseItemServices {
    private readonly createInventoryPurchaseItemusecases : CreateInventoryPurchaseItemUsecase;
    private readonly deleteInventoryPurchaseItemusecases : DeleteInventoryPurchaseItemUsecase;
    private readonly updateInventoryPurchaseItemusecases : UpdateInventoryPurchaseItemUsecase;
    private readonly getAllInventoryPurchaseItemusecases : GetAllInventoryPurchaseItemUsecase;
    private readonly getInventoryPurchaseItemByIdusecases : GetInventoryPurchaseItemByIdUsecase;

    constructor (
        createInventoryPurchaseItemusecases : CreateInventoryPurchaseItemUsecase,
        deleteInventoryPurchaseItemusecases : DeleteInventoryPurchaseItemUsecase,
        updateInventoryPurchaseItemusecases : UpdateInventoryPurchaseItemUsecase,
        getAllInventoryPurchaseItemusecases : GetAllInventoryPurchaseItemUsecase,
        getInventoryPurchaseItemByIdusecases : GetInventoryPurchaseItemByIdUsecase
    ) {
        this.createInventoryPurchaseItemusecases= createInventoryPurchaseItemusecases;
        this.deleteInventoryPurchaseItemusecases= deleteInventoryPurchaseItemusecases;
        this.updateInventoryPurchaseItemusecases= updateInventoryPurchaseItemusecases;
        this.getAllInventoryPurchaseItemusecases= getAllInventoryPurchaseItemusecases;
        this.getInventoryPurchaseItemByIdusecases= getInventoryPurchaseItemByIdusecases
    }
    async createInventoryPurchaseItem (req: Request, res: Response) : Promise<void>{
        const inventoryPurchaseItemData : InventoryPurchaseItemModel = InventoryPurchaseItemMapper.toModel(req.body);
        const newInventoryPurchaseItemData: Either<ErrorClass, InventoryPurchaseItemEntity> = 
        await this.createInventoryPurchaseItemusecases.execute(inventoryPurchaseItemData);

        newInventoryPurchaseItemData.cata(
            (error : ErrorClass) => 
            res.status(error.status).json({error : error.message}),
            (result : InventoryPurchaseItemEntity) => {
                const responseData = InventoryPurchaseItemMapper.toEntity(result, true);
                return res.json(responseData);
            }
        )
    }

    async deleteInventoryPurchaseItem (req: Request, res: Response) : Promise<void>{
        const inventoryPurchaseItemId : string= req.params.inventoryPurchaseItemId;
        const deletedInventoryPurchaseItem: Either<ErrorClass, void> =
        await this.deleteInventoryPurchaseItemusecases.execute(inventoryPurchaseItemId);

        deletedInventoryPurchaseItem.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Inventory Purchase Item deleted successfully." });
            }
        );
    }

    async updateInventoryPurchaseItem (req: Request, res: Response) : Promise<void> {
        const inventoryPurchaseItemId: string = req.params.inventoryPurchaseItemId;
        const inventoryPurchaseItemData: InventoryPurchaseItemModel = req.body;

        const existingInventoryPurchaseItem: Either<ErrorClass, InventoryPurchaseItemEntity> =
        await this.getInventoryPurchaseItemByIdusecases.execute(inventoryPurchaseItemId);

        existingInventoryPurchaseItem.cata(
        (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
        },
        async (existingInventoryPurchaseItemData: InventoryPurchaseItemEntity) => {
            const updatedInventoryPurchaseItemEntity: InventoryPurchaseItemEntity = InventoryPurchaseItemMapper.toEntity(
                inventoryPurchaseItemData,
                true,
                existingInventoryPurchaseItemData
            );

            const updatedInventoryPurchaseItem: Either<ErrorClass, InventoryPurchaseItemEntity> =
            await this.updateInventoryPurchaseItemusecases.execute(
                inventoryPurchaseItemId,
                updatedInventoryPurchaseItemEntity
            );

            updatedInventoryPurchaseItem.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            (result: InventoryPurchaseItemEntity) => {
                const resData = InventoryPurchaseItemMapper.toEntity(result, true);
                res.json(resData);
            }
            );
        }
        );
    }

    async getAllInventoyPurchaseItem (req: Request, res: Response) : Promise<void> {
        const inventoryPurchaseItems : Either<ErrorClass, InventoryPurchaseItemEntity[]> = await this.getAllInventoryPurchaseItemusecases.execute();
        inventoryPurchaseItems.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: InventoryPurchaseItemEntity[]) => {
                const resdata = result.map((inventoryPurchaseItem) =>
                InventoryPurchaseItemMapper.toModel(inventoryPurchaseItem)
              );
              return res.json(resdata);
            }
        )
    }

    async getInventoryPurchaseItemById (req: Request, res: Response) : Promise<void> {
        const inventoryPurchaseItemId : string = req.params.inventoryPurchaseItemId;
        const inventoryPurchaseItem : Either<ErrorClass, InventoryPurchaseItemEntity> = 
        await this.getInventoryPurchaseItemByIdusecases.execute(inventoryPurchaseItemId);
        inventoryPurchaseItem.cata(
            (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),
            (result: InventoryPurchaseItemEntity) => {
              const resdata = InventoryPurchaseItemMapper.toModel(result);
              return res.json(resdata);
            }
        );
    }
}