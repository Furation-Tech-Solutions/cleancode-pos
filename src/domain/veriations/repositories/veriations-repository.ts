import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface VeriationsRepository {
  createVeriations(Veriations: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>>;
  deleteVeriations(id: string): Promise<Either<ErrorClass, void>>;
  updateVeriations(id: string, data: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>>;
  getVeriationss(): Promise<Either<ErrorClass, VeriationsEntity[]>>;
  getVeriationsById(id: string): Promise<Either<ErrorClass, VeriationsEntity | null>>;
}

