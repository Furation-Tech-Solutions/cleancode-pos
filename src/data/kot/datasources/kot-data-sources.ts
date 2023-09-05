import mongoose from "mongoose";
import { Kot } from "../models/kot-model";
import { KotModel } from "@domain/kot/entities/kot";
import ApiError from "@presentation/error-handling/api-error";

export interface KotDataSource {
    create(kitchen: KotModel): Promise<any>;
    getAllKot(): Promise<any[]>; // Return type should be Promise of an array of Kot
  }
  

export class KotDataSourceImpl implements KotDataSource{
    constructor(private db: mongoose.Connection) {}

    async create(kot: KotModel): Promise<any> {
        const existingKot = await Kot.findOne({kot_number: kot.kot_number});
        if (existingKot) {
          throw ApiError.kitchen_codeExists();  //add apierror code for kot
        }
    
        const kotData = new Kot(kot);
    
        const createKot = await kotData.save();
        
        return createKot.toObject();
      }
   
    async getAllKot(): Promise<any[]> {
    const kot = await Kot.find();
    return kot.map((kot) => kot.toObject()); // Convert to plain JavaScript objects before returning
  }
  // async updateKot(id:string, kot:KotModel): Promise<any[]> {
  //   const updatedKot = await Kot.findByIdAndUpdate(id, kot, {
  //     new: true,
  //   }); // No need for conversion here
  //   return updatedKot ? updatedKot.toObject() :null; // Convert to plain JavaScript object before returning
  // }


}