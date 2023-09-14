import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetAdminByIdUsecase {
  execute: (adminId: string) => Promise<Either<ErrorClass, AdminEntity | null>>;
}

export class GetAdminById implements GetAdminByIdUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(
    adminId: string
  ): Promise<Either<ErrorClass, AdminEntity | null>> {
    return await this.adminRepository.getAdminById(adminId);
  }
}
