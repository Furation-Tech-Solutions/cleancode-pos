import {
  StaffModel,
  StaffEntity,
  LoginModel,
} from "@domain/staff/entities/staff";
import { Staff } from "../models/staff-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface StaffDataSource {
  create(staff: StaffModel): Promise<StaffEntity>; // Return type should be Promise of StaffEntity
  update(id: string, staff: StaffModel): Promise<StaffEntity>; // Return type should be Promise of StaffEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<StaffEntity | null>; // Return type should be Promise of StaffEntity or null
  getAllStaffs(): Promise<StaffEntity[]>; // Return type should be Promise of an array of StaffEntity
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
}

export class StaffDataSourceImpl implements StaffDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(staff: StaffModel): Promise<any> {
    const existingStaff = await Staff.findOne({
      email_address: staff.email_address,
    });
    if (existingStaff) {
      throw ApiError.emailExits();
    }

    const staffData = new Staff(staff);

    const createdStaff = await staffData.save();

    return createdStaff.toObject();
  }

  async update(id: string, staff: StaffModel): Promise<any> {
    const updatedStaff = await Staff.findByIdAndUpdate(id, staff, {
      new: true,
    }); // No need for conversion here
    return updatedStaff ? updatedStaff.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Staff.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const staff = await Staff.findById(id);
    return staff ? staff.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllStaffs(): Promise<any[]> {
    const staffs = await Staff.find();
    return staffs.map((staff) => staff.toObject()); // Convert to plain JavaScript objects before returning
  }

  async login(email: string, password: string): Promise<any> {
    const staff = await Staff.findOne({ email }).select("+password");

    if (!staff) {
      throw ApiError.staffNotFound();
    }
    return staff;
  }

  logout(): Promise<void> {
    throw new Error("Logout Failed");
  }
}

