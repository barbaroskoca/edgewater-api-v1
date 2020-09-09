import { findByEmail, createAndSave, deletePersonById, findById, updateAndSave, findAll } from "./PersonController";
import { Request, Response } from "express";


export default [
  {
    path: "/v1/persons",
    method: "post",
    handler: [      
      async (req: Request, res: Response): Promise<Response> => 
      await createAndSave(req.body)
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))      
    ]
  },
  {
    path: "/v1/persons/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response): Promise<Response> =>
        await findById(parseInt(req.params.id))
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))
    ]
  },
  {
    path: "/v1/persons/email/:email",
    method: "get",
    handler: [
      async (req: Request, res: Response): Promise<Response> =>
        await findByEmail(req.params.email)
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))
    ]
  },
  {
    path: "/v1/persons",
    method: "get",
    handler: [
      async (req: Request, res: Response): Promise<Response> =>
        await findAll()
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))
    ]
  },
  {
    path: "/v1/persons",
    method: "put",
    handler: [
      async (req: Request, res: Response): Promise<Response> =>
        await updateAndSave(req.body)
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))
    ]
  },
  {
    path: "/v1/persons/:id",
    method: "delete",
    handler: [
      async (req: Request, res: Response): Promise<Response> =>
        await deletePersonById(parseInt(req.params.id))
          .then(result => res.status(200).send(result))
          .catch(error => res.status(error.statusCode).send({ "message": error.message }))
    ]
  }
]