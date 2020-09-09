import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";


dotenv.config();

const entities = [`${process.env.TYPEORM_ENTITIES as string}`];

const isProduction = process.env.NODE_ENV=='production';

export const typeOrmConnectionConfig:ConnectionOptions = {
    type: 'mysql' ,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: entities,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: isProduction,
      },
    },
};


