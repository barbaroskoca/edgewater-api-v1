import {PersonRepository} from "../../../repositories";
import { getConnection } from "typeorm";
import { Person } from "../../../entities";

let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const findById = async (id: number): Promise<Person> =>
    await repository().findById(id);