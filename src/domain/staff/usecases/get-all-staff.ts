import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository"; 

export interface GetAllStaffsUsecase {
  execute: () => Promise<StaffEntity[]>;
}

export class GetAllStaffs implements GetAllStaffsUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(): Promise<StaffEntity[]> {
    return await this.staffRepository.getStaffs();
  }
}
