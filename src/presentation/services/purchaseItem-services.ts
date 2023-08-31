import { NextFunction, Request, Response } from "express";
import { PurchaseItemEntity, PurchaseItemModel, PurchaseItemMapper } from "@domain/purchaseItem/entities/purchaseItem";
import { CreatePurchaseItemUsecase } from "@domain/purchaseItem/usecases/create-purchaseItem";
import { GetAllPurchaseItemsUsecase } from "@domain/purchaseItem/usecases/get-all-purchaseItems";
import { GetPurchaseItemByIdUsecase } from "@domain/purchaseItem/usecases/get-purchaseItem-by-id";
import { UpdatePurchaseItemUsecase } from "@domain/purchaseItem/usecases/update-purchaseItem";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { DeletePurchaseItemUsecase } from "@domain/purchaseItem/usecases/delete-purchaseItem";


export class PurchaseItemService {
    private readonly createPurchaseItemUsecase: CreatePurchaseItemUsecase;
    private readonly getPurchaseItemByIdUsecase: GetPurchaseItemByIdUsecase;
    private readonly deletePurchaseItemUsecase: DeletePurchaseItemUsecase;
    private readonly updatePurchaseItemUsecase: UpdatePurchaseItemUsecase;
    private readonly getAllPurchaseItemsUsecase: GetAllPurchaseItemsUsecase;

    constructor(
        createPurchaseItemUsecase: CreatePurchaseItemUsecase,
        getPurchaseItemByIdUsecase: GetPurchaseItemByIdUsecase,
        getAllPurchaseItemsUsecase: GetAllPurchaseItemsUsecase,
        updatePurchaseItemUsecase: UpdatePurchaseItemUsecase,
        deletePurchaseItemUsecase: DeletePurchaseItemUsecase
    ) {
        this.createPurchaseItemUsecase = createPurchaseItemUsecase;
        this.getPurchaseItemByIdUsecase = getPurchaseItemByIdUsecase;
        this.getAllPurchaseItemsUsecase = getAllPurchaseItemsUsecase;
        this.updatePurchaseItemUsecase = updatePurchaseItemUsecase;
        this.deletePurchaseItemUsecase = deletePurchaseItemUsecase;
    }

    async createPurchaseItem(req: Request, res: Response): Promise<void> {
        const purchaseItemData: PurchaseItemModel = PurchaseItemMapper.toModel(
            req.body
        );

        const newPurchaseItem: Either<ErrorClass, PurchaseItemEntity> =
            await this.createPurchaseItemUsecase.execute(purchaseItemData);

        newPurchaseItem.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: PurchaseItemEntity) => {
                const resData = PurchaseItemMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async getPurchaseItemById(req: Request, res: Response): Promise<void> {
        const purchaseItemId: string = req.params.purchaseItemId;

        const purchaseItem: Either<ErrorClass, PurchaseItemEntity> =
            await this.getPurchaseItemByIdUsecase.execute(purchaseItemId);

        purchaseItem.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: PurchaseItemEntity) => {
                const resData = PurchaseItemMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async getAllPurchaseItems(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const purchaseItems: Either<ErrorClass, PurchaseItemEntity[]> =
            await this.getAllPurchaseItemsUsecase.execute();

        purchaseItems.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (purchaseItems: PurchaseItemEntity[]) => {
                const resData = purchaseItems.map((purchaseItem: any) =>
                    PurchaseItemMapper.toEntity(purchaseItem)
                );
                return res.json(resData);
            }
        );
    }

    async updatePurchaseItem(req: Request, res: Response): Promise<void> {
        const purchaseItemId: string = req.params.purchaseItemId;
        const purchaseItemData: PurchaseItemModel = req.body;

        const existingPurchaseItem: Either<ErrorClass, PurchaseItemEntity> =
            await this.getPurchaseItemByIdUsecase.execute(purchaseItemId);

        existingPurchaseItem.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (result: PurchaseItemEntity) => {
                const resData = PurchaseItemMapper.toEntity(result, true);

                const updatedPurchaseItemEntity: PurchaseItemEntity =
                    PurchaseItemMapper.toEntity(purchaseItemData, true, resData);

                const updatedPurchaseItem: Either<ErrorClass, PurchaseItemEntity> =
                    await this.updatePurchaseItemUsecase.execute(
                        purchaseItemId,
                        updatedPurchaseItemEntity
                    );

                updatedPurchaseItem.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (response: PurchaseItemEntity) => {
                        const responseData = PurchaseItemMapper.toModel(response);

                        res.json(responseData);
                    }
                );
            }
        );
    }

    async deletePurchaseItem(req: Request, res: Response): Promise<void> {
        const purchaseItemId: string = req.params.purchaseItemsurchaseItemId;

        const response: Either<ErrorClass, void> =
            await this.deletePurchaseItemUsecase.execute(purchaseItemId);

        response.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            () => {
                return res.json({ message: "Purchase Item deleted successfully." });
            }
        );
    }
}