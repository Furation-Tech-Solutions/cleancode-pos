import { KotEntity, KotMapper, KotModel } from "@domain/kot/entities/kot";
import { CreateKotUseCase } from "@domain/kot/usecases/create-kot";
import { GetAllKotUsecase } from "@domain/kot/usecases/get-all-kot";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Request, Response } from "express";
import { Either } from "monet";


export class KotService{
  private readonly GetAllKotUseCase:GetAllKotUsecase
  private readonly CreateKotUseCase:CreateKotUseCase

  constructor(
    CreateKotUseCase:CreateKotUseCase,
    GetAllKotUsecase: GetAllKotUsecase
    ){
    this.CreateKotUseCase=CreateKotUseCase;
    this.GetAllKotUseCase = GetAllKotUsecase
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
}