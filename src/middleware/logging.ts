import morgan from "morgan";
import { Router } from "express";
import { LoggerStream } from "../config/winston-config";

export const handleLoggingWithMorgan = (router: Router) =>
  router.use(morgan("combined", { stream: new LoggerStream() }));
