import { NextFunction, Request, Response } from "express";
import {
  RequisitionItemEntity,
  RequisitionItemModel,
  RequisitionItemMapper,
} from "@domain/requisitionItem/entities/requisitionItem";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateRequisitionItemUsecase } from "@domain/requisitionItem/usecases/create-requisitionItem";
import { GetRequisitionItemByIdUsecase } from "@domain/requisitionItem/usecases/get-requisitionItem-by-id";
import { GetAllRequisitionItemsUsecase } from "@domain/requisitionItem/usecases/get-all-requisitionItem";
import { UpdateRequisitionItemUsecase } from "@domain/requisitionItem/usecases/update-requisitionItem";
import { DeleteRequisitionItemUsecase } from "@domain/requisitionItem/usecases/delete-requisitionItem";

export class RequisitionItemService {
  private readonly createRequisitionItemUsecase: CreateRequisitionItemUsecase;
  private readonly getRequisitionItemByIdUsecase: GetRequisitionItemByIdUsecase;
  private readonly getAllRequisitionItemsUsecase: GetAllRequisitionItemsUsecase;
  private readonly updateRequisitionItemUsecase: UpdateRequisitionItemUsecase;
  private readonly deleteRequisitionItemUsecase: DeleteRequisitionItemUsecase;

  constructor(
    createRequisitionItemUsecase: CreateRequisitionItemUsecase,
    getRequisitionItemByIdUsecase: GetRequisitionItemByIdUsecase,
    getAllRequisitionItemsUsecase: GetAllRequisitionItemsUsecase,
    updateRequisitionItemUsecase: UpdateRequisitionItemUsecase,
    deleteRequisitionItemUsecase: DeleteRequisitionItemUsecase
  ) {
    this.createRequisitionItemUsecase = createRequisitionItemUsecase;
    this.getRequisitionItemByIdUsecase = getRequisitionItemByIdUsecase;
    this.getAllRequisitionItemsUsecase = getAllRequisitionItemsUsecase;
    this.updateRequisitionItemUsecase = updateRequisitionItemUsecase;
    this.deleteRequisitionItemUsecase = deleteRequisitionItemUsecase;
  }

  async createRequisitionItem(req: Request, res: Response): Promise<void> {
    const requisitionItemData: RequisitionItemModel =
      RequisitionItemMapper.toModel(req.body);
      console.log(req.body);
      

    const newRequisitionItem: Either<ErrorClass, RequisitionItemEntity> =
      await this.createRequisitionItemUsecase.execute(requisitionItemData);
      
    newRequisitionItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: RequisitionItemEntity) => {
        const resData = RequisitionItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getRequisitionItemById(req: Request, res: Response): Promise<void> {
    const requisitionItemId: string = req.params.requisitionItemId;

    const requisitionItem: Either<ErrorClass, RequisitionItemEntity> =
      await this.getRequisitionItemByIdUsecase.execute(requisitionItemId);

    requisitionItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: RequisitionItemEntity) => {
        const resData = RequisitionItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllRequisitionItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const requisitionItems: Either<ErrorClass, RequisitionItemEntity[]> =
      await this.getAllRequisitionItemsUsecase.execute();

    requisitionItems.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (requisitionItems: RequisitionItemEntity[]) => {
        const resData = requisitionItems.map((requisitionItem: any) =>
          RequisitionItemMapper.toEntity(requisitionItem)
        );
        return res.json(resData);
      }
    );
  }

  async updateRequisitionItem(req: Request, res: Response): Promise<void> {
    const requisitionItemId: string = req.params.requisitionItemId;
    const requisitionItemData: RequisitionItemModel = req.body;

    const existingRequisitionItem: Either<ErrorClass, RequisitionItemEntity> =
      await this.getRequisitionItemByIdUsecase.execute(requisitionItemId);

    existingRequisitionItem.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: RequisitionItemEntity) => {
        const resData = RequisitionItemMapper.toEntity(result, true);

        const updatedRequisitionItemEntity: RequisitionItemEntity =
          RequisitionItemMapper.toEntity(requisitionItemData, true, resData);

        const updatedRequisitionItem: Either<
          ErrorClass,
          RequisitionItemEntity
        > = await this.updateRequisitionItemUsecase.execute(
          requisitionItemId,
          updatedRequisitionItemEntity
        );

        updatedRequisitionItem.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: RequisitionItemEntity) => {
            const responseData = RequisitionItemMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteRequisitionItem(req: Request, res: Response): Promise<void> {
    const requisitionItemId: string = req.params.requisitionItemId;

    const response: Either<ErrorClass, void> =
      await this.deleteRequisitionItemUsecase.execute(requisitionItemId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "RequisitionItem deleted successfully." });
      }
    );
  }
}
