import { config } from "dotenv";
config();
const{DB_HOST,DB_PORT,MONGO_INITDB_DATABASE,MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD}=process.env;
export const configs = {
    PORT: process.env.PORT,
    DB_URL: `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DB_HOST}:${DB_PORT}/${MONGO_INITDB_DATABASE}`
};