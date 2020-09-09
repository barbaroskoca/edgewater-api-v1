import express from "express";
import { Router } from "express";
import cors from "cors";
import compression from "compression";
import * as helmet from "helmet";

export const handleCors = (router: Router):unknown =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router):void => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
};

export const handleCompression = (router: Router):unknown => router.use(compression());

export const handleHelmetSecurity = (router: Router):void => {
  router.use(helmet.default());
  router.use(helmet.hidePoweredBy());
};
