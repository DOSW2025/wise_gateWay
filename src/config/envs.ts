import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  AUTH_HOST: string;
  AUTH_PORT: number;
  FRONTEND_URL?: string;
  AUTH_AZURE?: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    AUTH_HOST: joi.string().required(),
    AUTH_PORT: joi.string().required(),
    FRONTEND_URL: joi.string().optional(),
    AUTH_AZURE: joi.string().optional(),

  })
  .unknown(true);
const result = envsSchema.validate(process.env);
if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}
const envVars = result.value as EnvVars;

export const envs = {
  port: envVars.PORT,
  authhost: envVars.AUTH_HOST,
  authport: envVars.AUTH_PORT,
  frontendurl: envVars.FRONTEND_URL,
  authazure: envVars.AUTH_AZURE,

};
