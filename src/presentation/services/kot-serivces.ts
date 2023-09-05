import { KotEntity, KotMapper, KotModel } from "@domain/kot/entities/kot";
import { CreateKotUseCase } from "@domain/kot/usecases/create-kot";
import { GetAllKotUsecase } from "@domain/kot/usecases/get-all-kot";
// import { UpdateKotUseCase } from "@domain/kot/usecases/update-kot";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Request, Response } from "express";
import { Either } from "monet";


export class KotService{
  private readonly GetAllKotUseCase:GetAllKotUsecase
  private readonly CreateKotUseCase:CreateKotUseCase
  // private readonly UpdateKotUseCase:UpdateKotUseCase

  constructor(
    CreateKotUseCase:CreateKotUseCase,
    GetAllKotUsecase: GetAllKotUsecase,
    // UpdateKotUseCase:UpdateKotUseCase,
    ){
    this.CreateKotUseCase=CreateKotUseCase;
    this.GetAllKotUseCase = GetAllKotUsecase;
    // this.UpdateKotUseCase = UpdateKotUseCase;
  }
  async createKot(req:Request,res:Response):Promise<void>{
    console.log(req.body,"body")
    const kotData: KotModel = KotMapper.toModel(req.body);

    // Call the CreateKitchenUsecase to create the kitchen
    const newKot: Either<ErrorClass, KotEntity> =
      await this.CreateKotUseCase.execute(kotData);

    newKot.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KotEntity) => {
        const responseData = KotMapper.toEntity(result, true);
        console.log(responseData)
        return res.json(responseData);
      }
    );

  }
  async getAllKot(req: Request, res: Response): Promise<void> {
    // Call the GetAllKitchensUsecase to get all kitchens
    const kitchens: Either<ErrorClass, KotEntity[]> =
      await this.GetAllKotUseCase.execute();

    kitchens.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KotEntity[]) => {
        // Convert kitchens from an array of KitchenEntity to an array of plain JSON objects using KitchenMapper
        const responseData = result.map((kot) =>
          KotMapper.toModel(kot)
        );
        return res.json(responseData);
      }
    );
  }
  // async updateKot(req: Request, res: Response): Promise<void> {
  //   const kotId: string = req.params.kotId;
  //   const kotData: KotModel = req.body;

  //   // Get the existing Kitchen by ID
  //   const existingKot: Either<ErrorClass, KotEntity | null > =
  //     await this.GetKotByIdUseCase.execute(kotId);
     
  //     if (!existingKot) {
  //       // If Kitchen is not found, send a not found message as a JSON response
  //       ApiError.notFound();
  //       return;
  //     }

  //     // Convert kitchenData from KitchenModel to KitchenEntity using KitchenMapper
  //     const updatedKotEntity: KotEntity = KotMapper.toEntity(
  //       kotData,
  //       true,
  //       // existingKitchen
  //     );

  //     // Call the UpdateKitchenUsecase to update the table
  //     const updatedKot: Either<ErrorClass, KotEntity> = await this.UpdateKotUseCase.execute(
  //       kotId,
  //       updatedKotEntity
  //     );

  //     updatedKot.cata(
  //       (error: ErrorClass) =>
  //       res.status(error.status).json({ error: error.message }),
  //       (result: KotEntity) =>{
  //         const responseData = KotMapper.toModel(result);
  //         return res.json(responseData)
  //       }
  //     )
  // }
}