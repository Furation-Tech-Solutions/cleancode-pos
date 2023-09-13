import { NextFunction, Request, Response } from "express";
import {
  InternalTransferEntity,
  InternalTransferModel,
  InternalTransferMapper,
} from "@domain/internalTransfer/entities/internalTransfer";
import { CreateInternalTransferUsecase } from "@domain/internalTransfer/usecases/create-internalTransfer";
import { DeleteInternalTransferUsecase } from "@domain/internalTransfer/usecases/delete-internalTransfer";
import { GetInternalTransferByIdUsecase } from "@domain/internalTransfer/usecases/get-internalTransfer-by-id";
import { UpdateInternalTransferUsecase } from "@domain/internalTransfer/usecases/update-internalTransfer";
import { GetAllInternalTransfersUsecase } from "@domain/internalTransfer/usecases/get-all-internalTransfer";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class InternalTransferService {
  private readonly createInternalTransferUsecase: CreateInternalTransferUsecase;
  private readonly deleteInternalTransferUsecase: DeleteInternalTransferUsecase;
  private readonly getInternalTransferByIdUsecase: GetInternalTransferByIdUsecase;
  private readonly updateInternalTransferUsecase: UpdateInternalTransferUsecase;
  private readonly getAllInternalTransfersUsecase: GetAllInternalTransfersUsecase;

  constructor(
    createInternalTransferUsecase: CreateInternalTransferUsecase,
    deleteInternalTransferUsecase: DeleteInternalTransferUsecase,
    getInternalTransferByIdUsecase: GetInternalTransferByIdUsecase,
    updateInternalTransferUsecase: UpdateInternalTransferUsecase,
    getAllInternalTransfersUsecase: GetAllInternalTransfersUsecase
  ) {
    this.createInternalTransferUsecase = createInternalTransferUsecase;
    this.deleteInternalTransferUsecase = deleteInternalTransferUsecase;
    this.getInternalTransferByIdUsecase = getInternalTransferByIdUsecase;
    this.updateInternalTransferUsecase = updateInternalTransferUsecase;
    this.getAllInternalTransfersUsecase = getAllInternalTransfersUsecase;
  }

  async createInternalTransfer(req: Request, res: Response): Promise<void> {
    const internalTransferData: InternalTransferModel =
      InternalTransferMapper.toModel(req.body);

    const newInternalTransfer: Either<ErrorClass, InternalTransferEntity> =
      await this.createInternalTransferUsecase.execute(internalTransferData);

    newInternalTransfer.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InternalTransferEntity) => {
        const resData = InternalTransferMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteInternalTransfer(req: Request, res: Response): Promise<void> {
    const internalTransferId: string = req.params.internalTransferId;

    const response: Either<ErrorClass, void> =
      await this.deleteInternalTransferUsecase.execute(internalTransferId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "InternalTransfer deleted successfully." });
      }
    );
  }

  async getInternalTransferById(req: Request, res: Response): Promise<void> {
    
    
    const internalTransferId: string = req.params.internalTransferId;
    
    const internalTransfer: Either<ErrorClass, InternalTransferEntity> =
      await this.getInternalTransferByIdUsecase.execute(internalTransferId);

    internalTransfer.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        
      (result: InternalTransferEntity) => {
        const resData = InternalTransferMapper.toEntity(result, true);
        return res.json(resData);
        
      }
    );
  }

  async updateInternalTransfer(req: Request, res: Response): Promise<void> {
    const internalTransferId: string = req.params.internalTransferId;
    const internalTransferData: InternalTransferModel = req.body;

    const existingInternalTransfer: Either<ErrorClass, InternalTransferEntity> =
      await this.getInternalTransferByIdUsecase.execute(internalTransferId);

    existingInternalTransfer.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InternalTransferEntity) => {
        const resData = InternalTransferMapper.toEntity(result, true);

        const updatedInternalTransferEntity: InternalTransferEntity =
          InternalTransferMapper.toEntity(internalTransferData, true, resData);

        const updatedInternalTransfer: Either<
          ErrorClass,
          InternalTransferEntity
        > = await this.updateInternalTransferUsecase.execute(
          internalTransferId,
          updatedInternalTransferEntity
        );

        updatedInternalTransfer.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InternalTransferEntity) => {
            const responseData = InternalTransferMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async getAllInternalTransfers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const internalTransfers: Either<ErrorClass, InternalTransferEntity[]> =
      await this.getAllInternalTransfersUsecase.execute();

    internalTransfers.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (internalTransfers: InternalTransferEntity[]) => {
        const resData = internalTransfers.map((internalTransfer: any) =>
          InternalTransferMapper.toEntity(internalTransfer)
        );
        return res.json(resData);
      }
    );
  }
}
