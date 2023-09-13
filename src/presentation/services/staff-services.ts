import { NextFunction, Request, Response } from "express";
import {
  StaffModel,
  StaffEntity,
  staffMapper,
} from "@domain/staff/entities/staff";
import { CreateStaffUsecase } from "@domain/staff/usecases/create-staff";
import { DeleteStaffUsecase } from "@domain/staff/usecases/delete-staff";
import { GetStaffByIdUsecase } from "@domain/staff/usecases/get-staff-by-id";
import { UpdateStaffUsecase } from "@domain/staff/usecases/update-staff";
import { GetAllStaffsUsecase } from "@domain/staff/usecases/get-all-staff";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class StaffService {
  private readonly createStaffUsecase: CreateStaffUsecase;
  private readonly deleteStaffUsecase: DeleteStaffUsecase;
  private readonly getStaffByIdUsecase: GetStaffByIdUsecase;
  private readonly updateStaffUsecase: UpdateStaffUsecase;
  private readonly getAllStaffsUsecase: GetAllStaffsUsecase;

  constructor(
    createStaffUsecase: CreateStaffUsecase,
    deleteStaffUsecase: DeleteStaffUsecase,
    getStaffByIdUsecase: GetStaffByIdUsecase,
    updateStaffUsecase: UpdateStaffUsecase,
    getAllStaffsUsecase: GetAllStaffsUsecase
  ) {
    this.createStaffUsecase = createStaffUsecase;
    this.deleteStaffUsecase = deleteStaffUsecase;
    this.getStaffByIdUsecase = getStaffByIdUsecase;
    this.updateStaffUsecase = updateStaffUsecase;
    this.getAllStaffsUsecase = getAllStaffsUsecase;
  }

  async createStaff(req: Request, res: Response): Promise<void> {
      
      // Extract staff data from the request body and convert it to staffModel
      const staffData: StaffModel = staffMapper.toModel(req.body);

      // Call the createStaffUsecase to create the staff
      const newStaff: Either<ErrorClass, StaffEntity> = await this.createStaffUsecase.execute(
        staffData
      );

      newStaff.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StaffEntity) =>{
          const responseData = staffMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteStaff(req: Request, res: Response): Promise<void> {
    
      const staffId: string = req.params.staffId;
    

      const updatedFoodCategoryEntity: StaffEntity = staffMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateFoodCategoryUsecase to update the FoodCategory
      const updatedFoodCategory: Either<ErrorClass, StaffEntity> = await this.updateStaffUsecase.execute(
        staffId,
        updatedFoodCategoryEntity
      );

      updatedFoodCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StaffEntity) =>{
          const responseData = staffMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getStaffById(req: Request, res: Response): Promise<void> {
      const staffId: string = req.params.staffId;

      // Call the GetstaffByIdUsecase to get the staff by ID
      const staff: Either<ErrorClass, StaffEntity | null> = await this.getStaffByIdUsecase.execute(
        staffId
      );

      staff.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StaffEntity | null) =>{
          const responseData = staffMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
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
      const updatedStaffEntity: StaffEntity = staffMapper.toEntity(
        staffData,
        true,
      );

      // Call the UpdatestaffUsecase to update the staff
      const updatedStaff: Either<ErrorClass, StaffEntity> = await this.updateStaffUsecase.execute(
        staffId,
        updatedStaffEntity
      );

      updatedStaff.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StaffEntity) =>{
          const responseData = staffMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllStaffs(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllstaffsUsecase to get all staffs
      const staffs: Either<ErrorClass, StaffEntity[]> = await this.getAllStaffsUsecase.execute();

      staffs.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: StaffEntity[]) => {
            // Filter out staffs with del_status set to "Deleted"
            const nonDeletedStaffs = result.filter((staff) => staff.del_status !== false);

            // Convert non-deleted staffs from an array of StaffEntity to an array of plain JSON objects using staffMapper
            const responseData = nonDeletedStaffs.map((staff) => staffMapper.toEntity(staff));
            return res.json(responseData);
        }
    );
  }
}
