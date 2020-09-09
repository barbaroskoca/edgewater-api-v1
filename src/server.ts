import http from "http";
import {createConnection} from "typeorm";
import express from "express";
import {applyMiddleware, applyRoutes} from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import logger from "./config/winston-config";


process.on("uncaughtException", e => {
    console.error(e);
    logger.error(e.message, e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.error(e);
    process.exit(1);
});
createConnection()
    .then(() => {
        const router = express();
        applyMiddleware(middleware, router);
        applyRoutes(routes, router);
        applyMiddleware(errorHandlers, router);
        const {PORT = 3010} = process.env;
        const server = http.createServer(router);

        server.listen(PORT, () =>
            console.log(`Server is running http://localhost:${PORT}...}`)
        );
    })
    .catch(error => {
        console.error("DB Connection Failure:", error);
        logger.error(error.message, error);
    });
