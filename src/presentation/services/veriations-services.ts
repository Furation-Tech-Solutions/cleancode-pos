import { NextFunction, Request, Response } from "express";
import {
  VeriationsModel,
  VeriationsEntity,
  VeriationsMapper,
} from "@domain/veriations/entities/veriations";
import { CreateVeriationsUsecase } from "@domain/veriations/usecases/create-veriations";
import { DeleteVeriationsUsecase } from "@domain/veriations/usecases/delete-veriations";
import { GetVeriationsByIdUsecase } from "@domain/veriations/usecases/get-veriations-by-id";
import { UpdateVeriationsUsecase } from "@domain/veriations/usecases/update-veriations";
import { GetAllVeriationssUsecase } from "@domain/veriations/usecases/get-all-veriations";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class VeriationsService {
  private readonly createVeriationsUsecase: CreateVeriationsUsecase;
  private readonly deleteVeriationsUsecase: DeleteVeriationsUsecase;
  private readonly getVeriationsByIdUsecase: GetVeriationsByIdUsecase;
  private readonly updateVeriationsUsecase: UpdateVeriationsUsecase;
  private readonly getAllVeriationssUsecase: GetAllVeriationssUsecase;

  constructor(
    createVeriationsUsecase: CreateVeriationsUsecase,
    deleteVeriationsUsecase: DeleteVeriationsUsecase,
    getVeriationsByIdUsecase: GetVeriationsByIdUsecase,
    updateVeriationsUsecase: UpdateVeriationsUsecase,
    getAllVeriationssUsecase: GetAllVeriationssUsecase
  ) {
    this.createVeriationsUsecase = createVeriationsUsecase;
    this.deleteVeriationsUsecase = deleteVeriationsUsecase;
    this.getVeriationsByIdUsecase = getVeriationsByIdUsecase;
    this.updateVeriationsUsecase = updateVeriationsUsecase;
    this.getAllVeriationssUsecase = getAllVeriationssUsecase;
  }

  async createVeriations(req: Request, res: Response): Promise<void> {
      
      // Extract veriations data from the request body and convert it to VeriationsModel
      const veriationsData: VeriationsModel = VeriationsMapper.toModel(req.body);

      // Call the createVeriationsUsecase to create the veriations
      const newVeriations: Either<ErrorClass, VeriationsEntity> = await this.createVeriationsUsecase.execute(
        veriationsData
      );

      newVeriations.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: VeriationsEntity) =>{
          const responseData = VeriationsMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteVeriations(req: Request, res: Response): Promise<void> {
    
      const veriationsId: string = req.params.veriationsId;
    

      const updatedVeriationsEntity: VeriationsEntity = VeriationsMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateVeriationsUsecase to update the veriations
      const updatedVeriations: Either<ErrorClass, VeriationsEntity> = await this.updateVeriationsUsecase.execute(
        veriationsId,
        updatedVeriationsEntity
      );

      updatedVeriations.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: VeriationsEntity) =>{
          const responseData = VeriationsMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getVeriationsById(req: Request, res: Response): Promise<void> {
      const veriationsId: string = req.params.veriationsId;

      // Call the GetVeriationsByIdUsecase to get the veriations by ID
      const veriations: Either<ErrorClass, VeriationsEntity | null> = await this.getVeriationsByIdUsecase.execute(
        veriationsId
      );

      veriations.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: VeriationsEntity | null) =>{
          const responseData = VeriationsMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateVeriations(req: Request, res: Response): Promise<void> {
    
      const veriationsId: string = req.params.veriationsId;
      const veriationsData: VeriationsModel = req.body;

      // Get the existing veriations by ID
      const existingVeriations: Either<ErrorClass, VeriationsEntity | null> =
        await this.getVeriationsByIdUsecase.execute(veriationsId);

      if (!existingVeriations) {
        // If veriations is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert veriationsData from VeriationsModel to VeriationsEntity using VeriationsMapper
      const updatedVeriationsEntity: VeriationsEntity = VeriationsMapper.toEntity(
        veriationsData,
        true,
      );

      // Call the UpdateVeriationsUsecase to update the veriations
      const updatedVeriations: Either<ErrorClass, VeriationsEntity> = await this.updateVeriationsUsecase.execute(
        veriationsId,
        updatedVeriationsEntity
      );

      updatedVeriations.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: VeriationsEntity) =>{
          const responseData = VeriationsMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllVeriationss(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllVeriationssUsecase to get all veriationss
      const veriationss: Either<ErrorClass, VeriationsEntity[]> = await this.getAllVeriationssUsecase.execute();

      veriationss.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: VeriationsEntity[]) => {
            // Filter out veriationss with del_status set to "Deleted"
            const nonDeletedVeriationss = result.filter((veriations) => veriations.del_status !== false);

            // Convert non-deleted veriationss from an array of VeriationsEntity to an array of plain JSON objects using VeriationsMapper
            const responseData = nonDeletedVeriationss.map((veriations) => VeriationsMapper.toEntity(veriations));
            return res.json(responseData);
        }
    );
  }
}
