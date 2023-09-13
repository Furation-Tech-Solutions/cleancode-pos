import { StaffModel, StaffEntity } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository"; 
import { StaffDataSource } from "@data/staff/datasource/staff-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class StaffRepositoryImpl implements StaffRepository {
  private readonly dataSource: StaffDataSource;

  constructor(dataSource: StaffDataSource) {
    this.dataSource = dataSource;
  }

  async createStaff(
    staff: StaffModel
  ): Promise<Either<ErrorClass, StaffEntity>> {
    // return await this.dataSource.create(staff);
    try {
      let i = await this.dataSource.create(staff);
      return Right<ErrorClass, StaffEntity>(i);
    } catch (e) {
      console.log(e);
      
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, StaffEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, StaffEntity>(ApiError.badRequest());
    }
  }

  async deleteStaff(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);

    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateStaff(
    id: string,
    data: StaffModel
  ): Promise<Either<ErrorClass, StaffEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, StaffEntity>(i);
    } catch {
      return Left<ErrorClass, StaffEntity>(ApiError.badRequest());
    }
  }

  async getStaffs(): Promise<Either<ErrorClass, StaffEntity[]>> {
    // return await this.dataSource.getAllStaffs();
    try {
      let i = await this.dataSource.getAllStaffs();
      return Right<ErrorClass, StaffEntity[]>(i);
    } catch {
      return Left<ErrorClass, StaffEntity[]>(ApiError.badRequest());
    }
  }

  async getStaffById(
    id: string
  ): Promise<Either<ErrorClass, StaffEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, StaffEntity | null>(i);
    } catch {
      return Left<ErrorClass, StaffEntity | null>(ApiError.badRequest());
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<Either<ErrorClass, StaffEntity>> {
    try {
      const res = await this.dataSource.login(email, password);

      return Right<ErrorClass, StaffEntity>(res);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, StaffEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, StaffEntity>(ApiError.badRequest());
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
