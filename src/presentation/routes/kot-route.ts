import { KotDataSourceImpl } from "@data/kot/datasources/kot-data-sources";
import { KotRepositoryImpl } from "@data/kot/repositories/kot-reposiotries-impl";
import { CreateKot } from "@domain/kot/usecases/create-kot";
import { GetAllKot } from "@domain/kot/usecases/get-all-kot";
// import { UpdateKot } from "@domain/kot/usecases/update-kot";
import { KotService } from "@presentation/services/kot-serivces";
import { Router } from "express";
import mongoose from "mongoose";

const mongooseConnection=mongoose.connection
const kotDataSource=new KotDataSourceImpl(mongooseConnection)
const kotRepository=new KotRepositoryImpl(kotDataSource)

const getAllKotUseCase=new GetAllKot(kotRepository)
const createKotUseCase=new CreateKot(kotRepository)
// const updateKotUseCase=new UpdateKot(kotRepository)



const kotServices=new KotService(
    createKotUseCase,
    getAllKotUseCase,
    // updateKotUseCase
)

export const kotRouter=Router()

kotRouter.get("/getAllKot",kotServices.getAllKot.bind(kotServices))
kotRouter.post("/create",kotServices.createKot.bind(kotServices))
// kotRouter.patch("/update",kotServices.updateKot.bind(kotServices))

