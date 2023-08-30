import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface StaffRepository {
  createStaff(staff: StaffModel): Promise<Either<ErrorClass, StaffEntity>>;
  deleteStaff(id: string): Promise<Either<ErrorClass, void>>;
  updateStaff(id: string, data: StaffModel): Promise<Either<ErrorClass, StaffEntity>>;
  getStaffs(): Promise<Either<ErrorClass, StaffEntity[]>>;
  getStaffById(id: string): Promise<Either<ErrorClass, StaffEntity | null>>;
}

