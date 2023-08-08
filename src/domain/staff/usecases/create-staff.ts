import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";

export interface CreateStaffUsecase {
  execute: (staffData: StaffModel) => Promise<StaffEntity>;
}

export class CreateStaff implements CreateStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(staffData: StaffModel): Promise<StaffEntity> {
    return await this.staffRepository.createStaff(staffData);
  }
}
