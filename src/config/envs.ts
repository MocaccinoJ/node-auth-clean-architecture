import * as dotenv from "dotenv";
dotenv.config();
import { get } from 'env-var';

export const envs = {
    NODE_PORT: get('NODE_PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
}