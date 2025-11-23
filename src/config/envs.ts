import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  AUTH_HOST: string;
  AUTH_PORT: number;
  USER_MANAGEMENT_HOST: string;
  USER_MANAGEMENT_PORT: number;
  JWT_SECRET: string;
  FRONTEND_URL: string;
  AUTH_AZURE?: string;
  USER_MANAGEMENT_AZURE?: string;
  AUTH_PROTOCOL?: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    AUTH_HOST: joi.string().required(),
    AUTH_PORT: joi.number().required(),
    USER_MANAGEMENT_HOST: joi.string().required(),
    USER_MANAGEMENT_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
    AUTH_AZURE: joi.string().optional(),
    USER_MANAGEMENT_AZURE: joi.string().optional(),
    AUTH_PROTOCOL: joi.string().valid('http', 'https').default('http'),
  })
  .unknown(true);

const result = envsSchema.validate(process.env);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.value as EnvVars;

export const envs = {
  port: envVars.PORT,
  authHost: envVars.AUTH_HOST,
  authPort: envVars.AUTH_PORT,
  userManagementHost: envVars.USER_MANAGEMENT_HOST,
  userManagementPort: envVars.USER_MANAGEMENT_PORT,
  jwtSecret: envVars.JWT_SECRET,
  frontendUrl: envVars.FRONTEND_URL.startsWith('http') ? envVars.FRONTEND_URL : `https://${envVars.FRONTEND_URL}`,
  authAzure: envVars.AUTH_AZURE,
  userManagementAzure: envVars.USER_MANAGEMENT_AZURE,
  protocol: envVars.AUTH_PROTOCOL,
};
