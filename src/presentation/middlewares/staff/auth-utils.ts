// auth-utils.ts

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, Schema } from "mongoose";
import { Staff } from "@data/staff/models/staff-model"; // Import your schema module

// Define a separate module for authentication-related functions

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function matchPassword(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

function generateToken(userId: string): string {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET || "");
}

export { hashPassword, matchPassword, generateToken };

// Now, you can use StaffModel (your schema) in your middleware

interface IStaffDocument extends Document {
  email_address: string;
  password: string;
}

export const staffSchema = Staff.schema; // Access the schema of the Staff model

staffSchema.pre("save", async function (this: IStaffDocument, next) {
  if (this.isModified("password") && this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

staffSchema.methods.matchPassword = async function (
  this: IStaffDocument,
  password: string
) {
  return await matchPassword(password, this.password);
};

staffSchema.methods.generateToken = function (this: IStaffDocument) {
  return generateToken(this._id);
};
