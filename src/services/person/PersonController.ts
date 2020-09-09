import service from "./functions";
import { Person } from "../../entities";
import {  DeleteResult } from "typeorm";
import { CreateAndSaveRequestModel, UpdateAndSaveRequestModel } from "../../models/requestModels/PersonModels";




export const createAndSave = async (req: CreateAndSaveRequestModel): Promise<Person> => {
 
    return await service.createAndSave(req);
}

export const findById = async (id: number): Promise<Person> => {
  
    return await service.findById(id);
}

export const findByEmail = async (email: string): Promise<Person> => {
 
    return await service.findByEmail(email)
}

export const findAll = async (): Promise<Person[]> => await service.findAll();

export const deletePersonById = async (id: number): Promise<DeleteResult> => 
{
 
    return await service.deleteById(id);
}

export const updateAndSave = async (req: UpdateAndSaveRequestModel): Promise<any> => {
    
    return await service.updateAndSave(req)
}