import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateStaffUsecase {
  execute: (
    staffId: string,
    staffData: StaffModel
  ) => Promise<Either<ErrorClass, StaffEntity>>;
}

export class UpdateStaff implements UpdateStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }
  async execute(staffId: string, staffData: StaffModel): Promise<Either<ErrorClass, StaffEntity>> {
   return await this.staffRepository.updateStaff(staffId, staffData);
 }
}
