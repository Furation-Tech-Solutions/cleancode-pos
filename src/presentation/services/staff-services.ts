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
    try {
      
      // Extract staff data from the request body and convert it to staffModel
      const staffData: StaffModel = staffMapper.toModel(req.body);

      // Call the createStaffUsecase to create the staff
      const newStaff: StaffEntity = await this.createStaffUsecase.execute(
        staffData
      );

      // Convert newstaff from staffEntity to the desired format using staffMapper
      const responseData = staffMapper.toEntity(newStaff, true);

      // Send the created staff as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

        //  ApiError.internalError()
        const err = ApiError.internalError();
        res.status(err.status).json(err.message);
    }
  }

  async deleteStaff(req: Request, res: Response): Promise<void> {
    try {
      const staffId: string = req.params.staffId;

      // Call the deleteStaffUsecase to delete the staff
      await this.deleteStaffUsecase.execute(staffId);

      // Send a success message as a JSON response
      res.json({ message: "staff deleted successfully." });
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          // ApiError.internalError()
          const err = ApiError.internalError();
          res.status(err.status).json(err.message);
    }
  }

  async getStaffById(req: Request, res: Response): Promise<void> {
    try {
      const staffId: string = req.params.staffId;

      // Call the GetstaffByIdUsecase to get the staff by ID
      const staff: StaffEntity | null = await this.getStaffByIdUsecase.execute(
        staffId
      );

      if (staff) {
        // Convert staff from staffEntity to plain JSON object using staffMapper
        const responseData = staffMapper.toModel(staff);

        // Send the staff as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        ApiError.notFound()
      }
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          // ApiError.internalError()
          const err = ApiError.internalError();
          res.status(err.status).json(err.message);
       
    }
  }

  async updateStaff(req: Request, res: Response): Promise<void> {
    try {
      const staffId: string = req.params.staffId;
      const staffData: StaffModel = req.body;

      // Get the existing staff by ID
      const existingStaff: StaffEntity | null =
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
        existingStaff
      );

      // Call the UpdatestaffUsecase to update the staff
      const updatedStaff: StaffEntity = await this.updateStaffUsecase.execute(
        staffId,
        updatedStaffEntity
      );

      // Convert updatedstaff from staffEntity to plain JSON object using staffMapper
      const responseData = staffMapper.toModel(updatedStaff);

      // Send the updated staff as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          // ApiError.internalError()
          const err = ApiError.internalError();
          res.status(err.status).json(err.message);
    }
  }

  async getAllStaffs(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllstaffsUsecase to get all staffs
      const staffs: StaffEntity[] = await this.getAllStaffsUsecase.execute();

      // Convert staffs from an array of staffEntity to an array of plain JSON objects using staffMapper
      const responseData = staffs.map((staff) => staffMapper.toModel(staff));

      // Send the staffs as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          // ApiError.internalError()
          const err = ApiError.internalError();
          res.status(err.status).json(err.message);
    }
  }
}
