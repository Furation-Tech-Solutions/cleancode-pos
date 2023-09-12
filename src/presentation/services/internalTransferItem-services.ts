import { NextFunction, Request, Response } from "express";
import {
  InternalTransferItemEntity,
  InternalTransferItemModel,
  InternalTransferItemMapper,
} from "@domain/internalTransferItem/entities/internalTransferItem";
import { CreateInternalTransferItemUsecase } from "@domain/internalTransferItem/usecases/create-internalTransferItem";
import { DeleteInternalTransferItemUsecase } from "@domain/internalTransferItem/usecases/delete-internalTransferItem";
import { GetInternalTransferItemByIdUsecase } from "@domain/internalTransferItem/usecases/get-internalTransferItem-by-id";
import { UpdateInternalTransferItemUsecase } from "@domain/internalTransferItem/usecases/update-internalTransferItem";
import { GetAllInternalTransferItemsUsecase } from "@domain/internalTransferItem/usecases/get-all-internalTransferItems";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class InternalTransferItemService {
  private readonly createInternalTransferItemUsecase: CreateInternalTransferItemUsecase;
  private readonly deleteInternalTransferItemUsecase: DeleteInternalTransferItemUsecase;
  private readonly getInternalTransferItemByIdUsecase: GetInternalTransferItemByIdUsecase;
  private readonly updateInternalTransferItemUsecase: UpdateInternalTransferItemUsecase;
  private readonly getAllInternalTransferItemsUsecase: GetAllInternalTransferItemsUsecase;

  constructor(
    createInternalTransferItemUsecase: CreateInternalTransferItemUsecase,
    deleteInternalTransferItemUsecase: DeleteInternalTransferItemUsecase,
    getInternalTransferItemByIdUsecase: GetInternalTransferItemByIdUsecase,
    updateInternalTransferItemUsecase: UpdateInternalTransferItemUsecase,
    getAllInternalTransferItemsUsecase: GetAllInternalTransferItemsUsecase
  ) {
    this.createInternalTransferItemUsecase = createInternalTransferItemUsecase;
    this.deleteInternalTransferItemUsecase = deleteInternalTransferItemUsecase;
    this.getInternalTransferItemByIdUsecase =
      getInternalTransferItemByIdUsecase;
    this.updateInternalTransferItemUsecase = updateInternalTransferItemUsecase;
    this.getAllInternalTransferItemsUsecase =
      getAllInternalTransferItemsUsecase;
  }

  async createInternalTransferItem(req: Request, res: Response): Promise<void> {
    const internalTransferItemData: InternalTransferItemModel =
      InternalTransferItemMapper.toModel(req.body);

    const newInternalTransferItem: Either<
      ErrorClass,
      InternalTransferItemEntity
    > = await this.createInternalTransferItemUsecase.execute(
      internalTransferItemData
    );

    newInternalTransferItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InternalTransferItemEntity) => {
        const resData = InternalTransferItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteInternalTransferItem(req: Request, res: Response): Promise<void> {
    const internalTransferItemId: string = req.params.internalTransferItemId;

    const response: Either<ErrorClass, void> =
      await this.deleteInternalTransferItemUsecase.execute(
        internalTransferItemId
      );

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({
          message: "InternalTransferItem deleted successfully.",
        });
      }
    );
  }

  async getInternalTransferItemById(
    req: Request,
    res: Response
  ): Promise<void> {
    const internalTransferItemId: string = req.params.internalTransferItemId;

    const internalTransferItem: Either<ErrorClass, InternalTransferItemEntity> =
      await this.getInternalTransferItemByIdUsecase.execute(
        internalTransferItemId
      );

    internalTransferItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),

      (result: InternalTransferItemEntity) => {
        const resData = InternalTransferItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async updateInternalTransferItem(req: Request, res: Response): Promise<void> {
    const internalTransferItemId: string = req.params.internalTransferItemId;
    const internalTransferItemData: InternalTransferItemModel = req.body;

    const existingInternalTransferItem: Either<
      ErrorClass,
      InternalTransferItemEntity
    > = await this.getInternalTransferItemByIdUsecase.execute(
      internalTransferItemId
    );

    existingInternalTransferItem.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InternalTransferItemEntity) => {
        const resData = InternalTransferItemMapper.toEntity(result, true);

        const updatedInternalTransferItemEntity: InternalTransferItemEntity =
          InternalTransferItemMapper.toEntity(
            internalTransferItemData,
            true,
            resData
          );

        const updatedInternalTransferItem: Either<
          ErrorClass,
          InternalTransferItemEntity
        > = await this.updateInternalTransferItemUsecase.execute(
          internalTransferItemId,
          updatedInternalTransferItemEntity
        );

        updatedInternalTransferItem.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InternalTransferItemEntity) => {
            const responseData = InternalTransferItemMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async getAllInternalTransferItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const internalTransferItems: Either<
      ErrorClass,
      InternalTransferItemEntity[]
    > = await this.getAllInternalTransferItemsUsecase.execute();

    internalTransferItems.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (internalTransferItems: InternalTransferItemEntity[]) => {
        const resData = internalTransferItems.map((internalTransferItem: any) =>
          InternalTransferItemMapper.toEntity(internalTransferItem)
        );
        return res.json(resData);
      }
    );
  }
}
