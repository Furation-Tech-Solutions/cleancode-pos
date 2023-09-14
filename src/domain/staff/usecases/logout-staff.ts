import {
  StaffEntity,
  StaffModel,
  LoginModel,
} from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface LogoutStaffUsecase {
  execute: () => Promise<any>;
}

export class LogoutStaff implements LogoutStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(): Promise<void> {
    return await this.staffRepository.logout();
  }
}
