import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";

export interface StaffRepository {
  createStaff(staff: StaffModel): Promise<StaffEntity>;
  deleteStaff(id: string): Promise<void>;
  updateStaff(id: string, data: StaffModel): Promise<StaffEntity>;
  getStaffs(): Promise<StaffEntity[]>;
  getStaffById(id: string): Promise<StaffEntity | null>;
}

