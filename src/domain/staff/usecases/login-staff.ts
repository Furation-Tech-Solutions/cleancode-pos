import {
  StaffEntity,
  StaffModel,
  LoginModel,
} from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface LoginStaffUsecase {
  execute: (email: string, password: string) => Promise<any>;
}

export class LoginStaff implements LoginStaffUsecase {
  private readonly staffRepository: StaffRepository;

  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository;
  }

  async execute(email: string, password: string): Promise<any> {
    return await this.staffRepository.login(email, password);
  }
}
