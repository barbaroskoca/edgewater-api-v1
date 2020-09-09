import "reflect-metadata";
import { getConnection } from "typeorm";
import {PersonRepository} from "../../../repositories";
import { Person } from "../../../entities";


let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const findByEmail = async (email: string): Promise<Person> => {
    return await repository().findByEmail(email);
}