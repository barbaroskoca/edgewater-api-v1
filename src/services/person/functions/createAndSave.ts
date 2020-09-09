import "reflect-metadata";
import { getConnection } from "typeorm";
import { Person } from "../../../entities";
import { PersonRepository } from "../../../repositories";
import { CreateAndSaveRequestModel } from "../../../models/requestModels/PersonModels";


let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const createAndSave = async (req: CreateAndSaveRequestModel): Promise<Person> =>
    await repository().createAndSave(req);