import express from "express";
import path from "path";

export const handleStaticFiles = (router: express.Router):unknown=>
  router.use(express.static(path.join(__dirname, "/../../public")));
