import { NextFunction, Request, Response } from "express";
import {
  RequisitionEntity,
  RequisitionModel,
  RequisitionMapper,
} from "@domain/requisition/entities/requisition";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateRequisitionUsecase } from "@domain/requisition/usecases/create-requisition";
import { GetRequisitionByIdUsecase } from "@domain/requisition/usecases/get-requisition-by-id";
import { GetAllRequisitionsUsecase } from "@domain/requisition/usecases/get-all-requisition";
import { UpdateRequisitionUsecase } from "@domain/requisition/usecases/update-requistion";
import { DeleteRequisitionUsecase } from "@domain/requisition/usecases/delete-requisition";

export class RequisitionService {
  private readonly createRequisitionUsecase: CreateRequisitionUsecase;
  private readonly getRequisitionByIdUsecase: GetRequisitionByIdUsecase;
  private readonly getAllRequisitionsUsecase: GetAllRequisitionsUsecase;
  private readonly updateRequisitionUsecase: UpdateRequisitionUsecase;
  private readonly deleteRequisitionUsecase: DeleteRequisitionUsecase;

  constructor(
    createRequisitionUsecase: CreateRequisitionUsecase,
    getRequisitionByIdUsecase: GetRequisitionByIdUsecase,
    getAllRequisitionsUsecase: GetAllRequisitionsUsecase,
    updateRequisitionUsecase: UpdateRequisitionUsecase,
    deleteRequisitionUsecase: DeleteRequisitionUsecase
  ) {
    this.createRequisitionUsecase = createRequisitionUsecase;
    this.getRequisitionByIdUsecase = getRequisitionByIdUsecase;
    this.getAllRequisitionsUsecase = getAllRequisitionsUsecase;
    this.updateRequisitionUsecase = updateRequisitionUsecase;
    this.deleteRequisitionUsecase = deleteRequisitionUsecase;
  }

  async createRequisition(req: Request, res: Response): Promise<void> {
    
    const requisitionData: RequisitionModel = RequisitionMapper.toModel(

      req.body

    );

    const newRequisition: Either<ErrorClass, RequisitionEntity> =
      await this.createRequisitionUsecase.execute(requisitionData);

    newRequisition.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: RequisitionEntity) => {
        const resData = RequisitionMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getRequisitionById(req: Request, res: Response): Promise<void> {
    const requisitionId: string = req.params.requisitionId;

    const requisition: Either<ErrorClass, RequisitionEntity> =
      await this.getRequisitionByIdUsecase.execute(requisitionId);

    requisition.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: RequisitionEntity) => {
        const resData = RequisitionMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllRequisitions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const requisitions: Either<ErrorClass, RequisitionEntity[]> =
      await this.getAllRequisitionsUsecase.execute();

    requisitions.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (requisitions: RequisitionEntity[]) => {
        const resData = requisitions.map((requisition: any) =>
          RequisitionMapper.toEntity(requisition)
        );
        return res.json(resData);
      }
    );
  }

  async updateRequisition(req: Request, res: Response): Promise<void> {
    const requisitionId: string = req.params.requisitionId;
    const requisitionData: RequisitionModel = req.body;

    const existingRequisition: Either<ErrorClass, RequisitionEntity> =
      await this.getRequisitionByIdUsecase.execute(requisitionId);

    existingRequisition.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: RequisitionEntity) => {
        const resData = RequisitionMapper.toEntity(result, true);

        const updatedRequisitionEntity: RequisitionEntity =
          RequisitionMapper.toEntity(requisitionData, true, resData);

        const updatedRequisition: Either<ErrorClass, RequisitionEntity> =
          await this.updateRequisitionUsecase.execute(
            requisitionId,
            updatedRequisitionEntity
          );

        updatedRequisition.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: RequisitionEntity) => {
            const responseData = RequisitionMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteRequisition(req: Request, res: Response): Promise<void> {
    const requisitionId: string = req.params.requisitionId;

    const response: Either<ErrorClass, void> =
      await this.deleteRequisitionUsecase.execute(requisitionId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Requisition deleted successfully." });
      }
    );
  }
}
