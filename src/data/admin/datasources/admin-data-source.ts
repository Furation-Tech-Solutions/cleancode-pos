import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Admin } from "../models/admin-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  update(id: string, admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of AdminEntity or null
  getAllAdmins(): Promise<any[]>; // Return type should be Promise of an array of AdminEntity
}

export class AdminDataSourceImpl implements AdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(admin: AdminModel): Promise<any> {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      throw ApiError.emailExits()
    }

    const adminData = new Admin(admin);

    const createdAdmin = await adminData.save();
    
    return createdAdmin.toObject();
  }

  async update(id: string, admin: AdminModel): Promise<any> {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
      new: true,
    }); // No need for conversion here
    return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const admin = await Admin.findById(id);
    return admin ? admin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAdmins(): Promise<any[]> {
    const admins = await Admin.find();
    return admins.map((admin) => admin.toObject()); // Convert to plain JavaScript objects before returning
  }
}
