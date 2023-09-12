import {type StaffRepository } from "@domain/staff/repositories/staff-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteStaffUsecase {
  execute: (staffId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteStaff implements DeleteStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(staffId: string): Promise<Either<ErrorClass, void>> {
    return await this.staffRepository.deleteStaff(staffId);
  }
}
