import {config} from "dotenv";
import * as process from "process";

config();
const {DB_HOST, DB_PORT, MONGO_INITDB_DATABASE,
    MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD} = process.env;
export const configs = {
    PORT: process.env.PORT,
    DB_URL: `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DB_HOST}:${DB_PORT}/${MONGO_INITDB_DATABASE}`,
    SECRET_SALT: +process.env.SECRET_SALT,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_TOKEN,
    JWT_ACCESS_EXPIRES_IN:process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN,
    SMTP_USER:process.env.SMTP_USER,
    SMTP_PASW:process.env.SMTP_PASW
};