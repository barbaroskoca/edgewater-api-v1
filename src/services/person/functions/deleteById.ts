import { getConnection, DeleteResult } from "typeorm";
import { PersonRepository } from "../../../repositories";

let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const deleteById = async (id: number): Promise<DeleteResult> =>
    await repository().deletePersonById(id);