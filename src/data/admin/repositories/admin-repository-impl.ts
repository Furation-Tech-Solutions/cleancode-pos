import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { AdminDataSource } from "@data/admin/datasources/admin-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSource: AdminDataSource) {
    this.dataSource = dataSource;
  }

  async createAdmin(
    admin: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let i = await this.dataSource.create(admin);
      return Right<ErrorClass, AdminEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, AdminEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async deleteAdmin(id: string): Promise<Either<ErrorClass, void>> {
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateAdmin(
    id: string,
    data: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, AdminEntity>(i);
    } catch {
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async getAdmins(): Promise<Either<ErrorClass, AdminEntity[]>> {
    try {
      let i = await this.dataSource.getAllAdmins();
      return Right<ErrorClass, AdminEntity[]>(i);
    } catch {
      return Left<ErrorClass, AdminEntity[]>(ApiError.badRequest());
    }
  }

  async getAdminById(
    id: string
  ): Promise<Either<ErrorClass, AdminEntity | null>> {
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, AdminEntity | null>(i);
    } catch {
      return Left<ErrorClass, AdminEntity | null>(ApiError.badRequest());
    }
  }

  async login(
    emailId: string,
    password: string
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      const res = await this.dataSource.login(emailId, password);

      return Right<ErrorClass, AdminEntity>(res);
    } catch (error) {

      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, AdminEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async logout(): Promise<Either<ErrorClass, string>> {
    try {
      const res = await this.dataSource.logout();
      return Right<ErrorClass, string>("Logged Out");
    } catch (error) {
      if (error instanceof ApiError) {
        return Left<ErrorClass, string>(error);
      }
      return Left<ErrorClass, string>(
        ApiError.customError(500, "Logout Failed")
      );
    }
  }
}
