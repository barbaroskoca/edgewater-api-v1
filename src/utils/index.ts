import { Router } from "express";
import { Wrapper, Route } from "../types";
export const applyMiddleware = (middleware: Wrapper[], router: Router) :void=>
  middleware.forEach(f => f(router));
export const applyRoutes = (routes: Route[], router: Router):void => {
  routes.forEach(route => {
    const { method, path, handler } = route;
    (router as any)[method](path, handler);
  });
};
