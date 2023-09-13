import { NextFunction, Request, Response } from "express";
import {
  StaffModel,
  StaffEntity,
  StaffMapper,
  LoginEntity,
  LoginModel
} from "@domain/staff/entities/staff";
import { CreateStaffUsecase } from "@domain/staff/usecases/create-staff";
import { DeleteStaffUsecase } from "@domain/staff/usecases/delete-staff";
import { GetStaffByIdUsecase } from "@domain/staff/usecases/get-staff-by-id";
import { UpdateStaffUsecase } from "@domain/staff/usecases/update-staff";
import { GetAllStaffsUsecase } from "@domain/staff/usecases/get-all-staff";
import { LoginStaffUsecase } from "@domain/staff/usecases/login-staff";
import { LogoutStaffUsecase } from "@domain/staff/usecases/logout-staff";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { staffSchema } from "@presentation/middlewares/staff/auth-utils";

export class StaffService {
  private readonly createStaffUsecase: CreateStaffUsecase;
  private readonly deleteStaffUsecase: DeleteStaffUsecase;
  private readonly getStaffByIdUsecase: GetStaffByIdUsecase;
  private readonly updateStaffUsecase: UpdateStaffUsecase;
  private readonly getAllStaffsUsecase: GetAllStaffsUsecase;
  private readonly loginStaffUsecase: LoginStaffUsecase;
  private readonly logoutStaffUsecase: LogoutStaffUsecase;

  constructor(
    createStaffUsecase: CreateStaffUsecase,
    deleteStaffUsecase: DeleteStaffUsecase,
    getStaffByIdUsecase: GetStaffByIdUsecase,
    updateStaffUsecase: UpdateStaffUsecase,
    getAllStaffsUsecase: GetAllStaffsUsecase,
    loginStaffUsecase: LoginStaffUsecase,
    logoutStaffUsecase: LogoutStaffUsecase
  ) {
    this.createStaffUsecase = createStaffUsecase;
    this.deleteStaffUsecase = deleteStaffUsecase;
    this.getStaffByIdUsecase = getStaffByIdUsecase;
    this.updateStaffUsecase = updateStaffUsecase;
    this.getAllStaffsUsecase = getAllStaffsUsecase;
    (this.loginStaffUsecase = loginStaffUsecase),
      (this.logoutStaffUsecase = logoutStaffUsecase);
  }

  async createStaff(req: Request, res: Response): Promise<void> {
    // Extract staff data from the request body and convert it to staffModel
    const staffData: StaffModel = StaffMapper.toModel(req.body);

    // Call the createStaffUsecase to create the staff
    const newStaff: Either<ErrorClass, StaffEntity> =
      await this.createStaffUsecase.execute(staffData);

    newStaff.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: StaffEntity) => {
        const responseData = StaffMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async deleteStaff(req: Request, res: Response): Promise<void> {
    const staffId: string = req.params.staffId;

    const updatedFoodCategoryEntity: StaffEntity = StaffMapper.toEntity(
      { del_status: false },
      true
    );

    // Call the UpdateFoodCategoryUsecase to update the FoodCategory
    const updatedFoodCategory: Either<ErrorClass, StaffEntity> =
      await this.updateStaffUsecase.execute(staffId, updatedFoodCategoryEntity);

    updatedFoodCategory.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: StaffEntity) => {
        const responseData = StaffMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getStaffById(req: Request, res: Response): Promise<void> {
    const staffId: string = req.params.staffId;

    // Call the GetstaffByIdUsecase to get the staff by ID
    const staff: Either<ErrorClass, StaffEntity | null> =
      await this.getStaffByIdUsecase.execute(staffId);

    staff.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: StaffEntity | null) => {
        const responseData = StaffMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async updateStaff(req: Request, res: Response): Promise<void> {
    const staffId: string = req.params.staffId;
    const staffData: StaffModel = req.body;

    // Get the existing staff by ID
    const existingStaff: Either<ErrorClass, StaffEntity | null> =
      await this.getStaffByIdUsecase.execute(staffId);

    if (!existingStaff) {
      // If staff is not found, send a not found message as a JSON response
      ApiError.notFound();
      return;
    }

    // Convert staffData from staffModel to staffEntity using staffMapper
    const updatedStaffEntity: StaffEntity = StaffMapper.toEntity(
      staffData,
      true
    );

    // Call the UpdatestaffUsecase to update the staff
    const updatedStaff: Either<ErrorClass, StaffEntity> =
      await this.updateStaffUsecase.execute(staffId, updatedStaffEntity);

    updatedStaff.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: StaffEntity) => {
        const responseData = StaffMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getAllStaffs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllstaffsUsecase to get all staffs
    const staffs: Either<ErrorClass, StaffEntity[]> =
      await this.getAllStaffsUsecase.execute();

    staffs.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: StaffEntity[]) => {
        // Filter out staffs with del_status set to "Deleted"
        const nonDeletedStaffs = result.filter(
          (staff) => staff.del_status !== false
        );

        // Convert non-deleted staffs from an array of StaffEntity to an array of plain JSON objects using staffMapper
        const responseData = nonDeletedStaffs.map((staff) =>
          StaffMapper.toEntity(staff)
        );
        return res.json(responseData);
      }
    );
  }

  async loginStaff(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const staffResult: Either<ErrorClass, any> =
      await this.loginStaffUsecase.execute(email, password);

    staffResult.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (staff: any) => {
        const isMatch = await staff.matchPassword(password);
        if (!isMatch) {
          const err = ApiError.forbidden();
          return res.status(err.status).json(err.message);
        }

        

        const token = await staff.generateToken();

        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        const resData = { staff: StaffMapper.toEntity(staff, true) };
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
