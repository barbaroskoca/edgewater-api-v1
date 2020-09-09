import "reflect-metadata";
import { getConnection } from "typeorm";
import { Person } from "../../../entities";
import { PersonRepository } from "../../../repositories";


let personRepository: PersonRepository;

const repository = (): PersonRepository => (!personRepository) ?
    getConnection().getCustomRepository(PersonRepository) : personRepository;

export const findAll = async (): Promise<Person[]> =>
    await repository().findAll();