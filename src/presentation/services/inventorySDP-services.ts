import { NextFunction, Request, Response } from "express";
import { InventorySDPEntity, InventorySDPModel, InventorySDPMapper } from "@domain/inventorySDP/entities/inventorySDP";
import { CreateInventorySDPUsecase } from "@domain/inventorySDP/usecases/create-inventorySDP";
import { GetAllInventorySDPsUsecase } from "@domain/inventorySDP/usecases/get-all-inventorySDP";
import { GetInventorySDPByIdUsecase } from "@domain/inventorySDP/usecases/get-inventorySDP-by-id";
import { UpdateInventorySDPUsecase } from "@domain/inventorySDP/usecases/update-inventorySDP";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { DeleteInventorySDPUsecase } from "@domain/inventorySDP/usecases/delete-inventorySDP";


export class InventorySDPService {
    private readonly createInventorySDPUsecase: CreateInventorySDPUsecase;
    private readonly getInventorySDPByIdUsecase: GetInventorySDPByIdUsecase;
    private readonly deleteInventorySDPUsecase: DeleteInventorySDPUsecase;
    private readonly updateInventorySDPUsecase: UpdateInventorySDPUsecase;
    private readonly getAllInventorySDPsUsecase: GetAllInventorySDPsUsecase;

    constructor(
        createInventorySDPUsecase: CreateInventorySDPUsecase,
        getInventorySDPByIdUsecase: GetInventorySDPByIdUsecase,
        getAllInventorySDPsUsecase: GetAllInventorySDPsUsecase,
        updateInventorySDPUsecase: UpdateInventorySDPUsecase,
        deleteInventorySDPUsecase: DeleteInventorySDPUsecase
    ) {
        this.createInventorySDPUsecase = createInventorySDPUsecase;
        this.getInventorySDPByIdUsecase = getInventorySDPByIdUsecase;
        this.getAllInventorySDPsUsecase = getAllInventorySDPsUsecase;
        this.updateInventorySDPUsecase = updateInventorySDPUsecase;
        this.deleteInventorySDPUsecase = deleteInventorySDPUsecase;
    }

    async createInventorySDP(req: Request, res: Response): Promise<void> {
        const inventorySDPData: InventorySDPModel = InventorySDPMapper.toModel(
            req.body
        );

        const newInventorySDP: Either<ErrorClass, InventorySDPEntity> =
            await this.createInventorySDPUsecase.execute(inventorySDPData);

        newInventorySDP.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: InventorySDPEntity) => {
                const resData = InventorySDPMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async getInventorySDPById(req: Request, res: Response): Promise<void> {
        const inventorySDPId: string = req.params.inventorySDPId;

        const inventorySDP: Either<ErrorClass, InventorySDPEntity> =
            await this.getInventorySDPByIdUsecase.execute(inventorySDPId);

        inventorySDP.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: InventorySDPEntity) => {
                const resData = InventorySDPMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async getAllInventorySDPs(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const inventorySDPs: Either<ErrorClass, InventorySDPEntity[]> =
            await this.getAllInventorySDPsUsecase.execute();

        inventorySDPs.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (inventorySDPs: InventorySDPEntity[]) => {
                const resData = inventorySDPs.map((inventorySDP: any) =>
                    InventorySDPMapper.toEntity(inventorySDP)
                );
                return res.json(resData);
            }
        );
    }

    async updateInventorySDP(req: Request, res: Response): Promise<void> {
        const inventorySDPId: string = req.params.inventorySDPId;
        const inventorySDPData: InventorySDPModel = req.body;

        const existingInventorySDP: Either<ErrorClass, InventorySDPEntity> =
            await this.getInventorySDPByIdUsecase.execute(inventorySDPId);

        existingInventorySDP.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (result: InventorySDPEntity) => {
                const resData = InventorySDPMapper.toEntity(result, true);

                const updatedInventorySDPEntity: InventorySDPEntity =
                    InventorySDPMapper.toEntity(inventorySDPData, true, resData);

                const updatedInventorySDP: Either<ErrorClass, InventorySDPEntity> =
                    await this.updateInventorySDPUsecase.execute(
                        inventorySDPId,
                        updatedInventorySDPEntity
                    );

                updatedInventorySDP.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (response: InventorySDPEntity) => {
                        const responseData = InventorySDPMapper.toModel(response);

                        res.json(responseData);
                    }
                );
            }
        );
    }

    async deleteInventorySDP(req: Request, res: Response): Promise<void> {
        const inventorySDPId: string = req.params.inventorySDPId;

        const response: Either<ErrorClass, void> =
            await this.deleteInventorySDPUsecase.execute(inventorySDPId);

        response.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            () => {
                return res.json({ message: "Inventory SDP deleted successfully." });
            }
        );
    }
}