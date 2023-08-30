import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateStaffUsecase {
  execute: (staffData: StaffModel) => Promise<Either<ErrorClass, StaffEntity>>;
}

export class CreateStaff implements CreateStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(staffData: StaffModel): Promise<Either<ErrorClass, StaffEntity>> {
    return await this.staffRepository.createStaff(staffData);
  }
}
