import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetStaffByIdUsecase {
  execute: (staffId: string) => Promise<Either<ErrorClass, StaffEntity | null>>;
}

export class GetStaffById implements GetStaffByIdUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(staffId: string): Promise<Either<ErrorClass, StaffEntity | null>> {
    return await this.staffRepository.getStaffById(staffId);
  }
}
