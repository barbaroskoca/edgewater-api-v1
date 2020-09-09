import "reflect-metadata";
import { Repository, EntityRepository } from "typeorm";
import { Person } from "../entities";
import logger from "../config/winston-config";
import { HTTPConflictError, HTTP400Error } from "../utils/httpErrors";
import { CreateAndSaveRequestModel, UpdateAndSaveRequestModel } from "../models/requestModels/PersonModels";

@EntityRepository(Person)
export default class PersonRepository extends Repository<Person> {

  createAndSave = async (req: CreateAndSaveRequestModel): Promise<Person> =>
    await this.checkIfPersonWithGivenEmailExist(req.email).then(async (result: boolean) => {
      if (result) {
        throw new HTTPConflictError();
      }
      else {
        const person = req as Person;
        return await this.save(person)
          .catch(error => {
            logger.error(error.message, error);
            throw new HTTP400Error(`Person with ${req.email} could not be created`);
          });
      }
    }
    ).catch(error => {
      logger.error(error.message, error);
      if (error.statusCode == 409) {
        throw new HTTPConflictError(`Person with ${req.email} as person name already exist. Could not be created`);
      }
      else {
        throw new HTTP400Error(`Person with ${req.email} could not be created`);
      }
    });


  updateAndSave = async (req: UpdateAndSaveRequestModel): Promise<any> =>
    await this.createQueryBuilder()
      .update(Person)
      .set({
        email: req.email,
        fullName: req.fullName,
        role: req.role,        
        password: req.password,
      })
      .where("id = :id", { id: req.id })
      .execute()
      .then(result => {
        if (result.affected == 0) {
          throw new HTTP400Error();
        }
        return req;
      })
      .catch(error => {
        logger.error(error.message, error);
        if (error.statusCode == 409) {
          throw new HTTPConflictError(`Person with ${req.email} as person name already exist. Could not be updated`);
        }
        else {
          throw new HTTP400Error(`Person with ${req.email} could not be found`);
        }
      });


  async findById(id: number): Promise<Person> {
    return await this.findOneOrFail({ id: id })
      .catch(error => {
        logger.error(error.message, error);
        throw new HTTP400Error(`Person cannot found `);
      })
  }

  async findByEmail(email: string): Promise<Person> {
    return await this
    .findOneOrFail({
      join: {
        alias: "person",
        leftJoinAndSelect: {
          "personEmailVerifications": "person.personEmailVerifications",
        }
      },
      where: {
        email: email
      }
    })
      .catch(error => {
        logger.error(error.message, error);
        throw new HTTP400Error(`Person with ${email} not found `);
      })
  }

  async findAll(): Promise<Person[]> {
    return await this.find()
      .catch(error => {
        logger.error(error.message, error);
        throw new HTTP400Error("Person table is empty");
      })
  }

  async deletePersonById(id: number): Promise<any> {
    return await this.delete({ id: id })
      .then(result => {
        if (result.affected == 0) {
          throw new HTTP400Error();
        }
      })
      .catch(error => {
        logger.error(error.message, error);
        throw new HTTP400Error(`Person cannot found`);
      })
  }

  checkIfPersonWithGivenEmailExist = async (email: string): Promise<boolean> =>
    await this.findAndCount({ email })
      .then(result => result[1] != 0).catch(error => {
        logger.error(error.message, error);
        throw new HTTP400Error(`Unable to check whether whether person with ${email} email exist`);
      }
      );

}

