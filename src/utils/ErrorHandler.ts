import { Response } from "express";
import {
  HTTPClientError,
  HTTP404Error,
  HTTPUnauthorisedError
} from "../utils/httpErrors";
import { NextFunction } from "connect";
import winston from "../config/winston-config";

export const notFoundError = ():unknown => {
  throw new HTTP404Error("Resource not found.");
};

export const unauthorisedError = ():unknown => {
  throw new HTTPUnauthorisedError("Unauthorised");
};

export const clientError = (err: Error, res: Response, next: NextFunction):any => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send({
      message: err.message
    });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction):any => {
  console.error(err);
  winston.error(err);
  if (process.env.NODE_ENV === "production")
    res.status(500).send({
      message: "Internal Server Error"
    });
  else
    res.status(500).send({
      message: "Internal Server Error",
      stack: err.stack
    });

  next(err);
};
