import "reflect-metadata";
import { getConnection, UpdateResult } from "typeorm";
import { PersonRepository } from "../../../repositories";
import { UpdateAndSaveRequestModel } from "../../../models/requestModels/PersonModels";


let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const updateAndSave = async (req: UpdateAndSaveRequestModel): Promise<any> =>
    await repository().updateAndSave(req);