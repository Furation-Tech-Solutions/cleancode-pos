import {type StaffRepository } from "@domain/staff/repositories/staff-repository"; 

export interface DeleteStaffUsecase {
  execute: (staffId: string) => Promise<void>
}

export class DeleteStaff implements DeleteStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(staffId: string): Promise<void> {
    await this.staffRepository.deleteStaff(staffId);
  }
}
