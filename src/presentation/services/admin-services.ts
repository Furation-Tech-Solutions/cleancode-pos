import { NextFunction, Request, Response } from "express";
import {
  AdminModel,
  AdminEntity,
  AdminMapper,
  LoginEntity,
  LoginModel,
} from "@domain/admin/entities/admin";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { LoginAdminUsecase } from "@domain/admin/usecases/login-admin";
import { LogoutAdminUsecase } from "@domain/admin/usecases/logout-admin";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { isAuthenticated } from "@presentation/middlewares/jwtAuthentication/auth";

export class AdminService {
  private readonly createAdminUsecase: CreateAdminUsecase;
  private readonly deleteAdminUsecase: DeleteAdminUsecase;
  private readonly getAdminByIdUsecase: GetAdminByIdUsecase;
  private readonly updateAdminUsecase: UpdateAdminUsecase;
  private readonly getAllAdminsUsecase: GetAllAdminsUsecase;
  private readonly loginAdminUsecase: LoginAdminUsecase;
  private readonly logoutAdminUsecase: LogoutAdminUsecase;

  constructor(
    createAdminUsecase: CreateAdminUsecase,
    deleteAdminUsecase: DeleteAdminUsecase,
    getAdminByIdUsecase: GetAdminByIdUsecase,
    updateAdminUsecase: UpdateAdminUsecase,
    getAllAdminsUsecase: GetAllAdminsUsecase,
    loginAdminUsecase: LoginAdminUsecase,
    logoutAdminUsecase: LogoutAdminUsecase
  ) {
    this.createAdminUsecase = createAdminUsecase;
    this.deleteAdminUsecase = deleteAdminUsecase;
    this.getAdminByIdUsecase = getAdminByIdUsecase;
    this.updateAdminUsecase = updateAdminUsecase;
    this.getAllAdminsUsecase = getAllAdminsUsecase;
    (this.loginAdminUsecase = loginAdminUsecase),
      (this.logoutAdminUsecase = logoutAdminUsecase);
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    // Extract admin data from the request body and convert it to adminModel
    const adminData: AdminModel = AdminMapper.toModel(req.body);

    // Call the createAdminUsecase to create the admin
    const newAdmin: Either<ErrorClass, AdminEntity> =
      await this.createAdminUsecase.execute(adminData);

    newAdmin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const responseData = AdminMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;

    // Call the DeleteAdminUsecase to delete the admin
    const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
      { del_status: false },
      true
    );

    // Call the UpdateAdminUsecase to update the admin
    const updatedAdmin: Either<ErrorClass, AdminEntity> =
      await this.updateAdminUsecase.execute(adminId, updatedAdminEntity);

    updatedAdmin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const responseData = AdminMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getAdminById(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;

    // Call the GetadminByIdUsecase to get the admin by ID
    const admin: Either<ErrorClass, AdminEntity | null> =
      await this.getAdminByIdUsecase.execute(adminId);

    admin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity | null) => {
        const responseData = AdminMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    const adminId: string = req.params.adminId;
    const adminData: AdminModel = req.body;

    // Get the existing admin by ID
    const existingAdmin: Either<ErrorClass, AdminEntity | null> =
      await this.getAdminByIdUsecase.execute(adminId);

    if (!existingAdmin) {
      // If admin is not found, send a not found message as a JSON response
      ApiError.notFound();
      return;
    }

    // Convert adminData from adminModel to adminEntity using adminMapper
    const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
      adminData,
      true
    );

    // Call the UpdateadminUsecase to update the admin
    const updatedAdmin: Either<ErrorClass, AdminEntity> =
      await this.updateAdminUsecase.execute(adminId, updatedAdminEntity);

    updatedAdmin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const responseData = AdminMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getAllAdmins(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const admins: Either<ErrorClass, AdminEntity[]> =
      await this.getAllAdminsUsecase.execute();

    admins.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (admins: AdminEntity[]) => {
        const resData = admins.map((admin: any) => AdminMapper.toEntity(admin));
        return res.json(resData);
      }
    );
  }

  async loginAdmin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const adminResult: Either<ErrorClass, any> =
      await this.loginAdminUsecase.execute(email, password);

    adminResult.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (admin: any) => {
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
          const err = ApiError.forbidden();
          return res.status(err.status).json(err.message);
        }

        const token = await admin.generateToken();

        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        const resData = { admin: AdminMapper.toEntity(admin, true) };
        res.cookie("token", token, options).json(resData);
      }
    );
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
      res
        .status(200)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Logged Out",
        });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
