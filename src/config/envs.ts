import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  AUTH_HOST: string;
  AUTH_PORT: number;
  EVENT_GRID_TOPIC_URL: string;
  EVENT_GRID_KEY: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    AUTH_HOST: joi.string().required(),
    AUTH_PORT: joi.string().required(),
    EVENT_GRID_TOPIC_URL: joi.string().required(),
    EVENT_GRID_KEY: joi.string().required(),

  })
  .unknown(true);
const result = envsSchema.validate(process.env);
if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}
const envVars = result.value as EnvVars;

export const envs = {
  port: envVars.PORT,
  databaseurl: envVars.DATABASE_URL,
  authhost: envVars.AUTH_HOST,
  authport: envVars.AUTH_PORT,
  eventgridkey: envVars.EVENT_GRID_KEY,
  eventgridtopic: envVars.EVENT_GRID_TOPIC_URL,
};
