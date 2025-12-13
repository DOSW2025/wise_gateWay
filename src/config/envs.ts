import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  AUTH_HOST: string;
  AUTH_PORT: number;
  USER_MANAGEMENT_HOST: string;
  USER_MANAGEMENT_PORT: number;
  COMUNIDAD_HOST: string;
  COMUNIDAD_PORT: number;
  JWT_SECRET: string;
  FRONTEND_URL: string;
  AUTH_AZURE?: string;
  USER_MANAGEMENT_AZURE?: string;
  AUTH_PROTOCOL?: string;
  NOTIFICACIONES_AZURE?: string;
  NOTIFICACIONES_PORT?: number;
  MATERIALES_AZURE?: string;
  MATERIALES_PORT?: number;
  COMUNIDAD_AZURE?: string;
  IA_AZURE?: string;
  IA_PORT?: number;
  TUTORIAS_AZURE?: string;
  TUTORIAS_PORT?: number;
  TUTORIAS_HOST?: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    AUTH_HOST: joi.string().required(),
    AUTH_PORT: joi.number().required(),
    USER_MANAGEMENT_HOST: joi.string().required(),
    USER_MANAGEMENT_PORT: joi.number().required(),
    COMUNIDAD_HOST: joi.string().required(),
    COMUNIDAD_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
    AUTH_AZURE: joi.string().optional(),
    USER_MANAGEMENT_AZURE: joi.string().optional(),
    AUTH_PROTOCOL: joi.string().valid('http', 'https').default('http'),
    NOTIFICACIONES_AZURE: joi.string().optional(),
    NOTIFICACIONES_PORT: joi.number().optional(),
    MATERIALES_AZURE: joi.string().optional(),
    MATERIALES_PORT: joi.number().optional(),
    COMUNIDAD_AZURE: joi.string().optional(),
    IA_AZURE: joi.string().optional(),
    IA_PORT: joi.number().optional(),
    TUTORIAS_AZURE: joi.string().optional(),
    TUTORIAS_PORT: joi.number().optional(),
    TUTORIAS_HOST: joi.string().optional(),
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
  comunidadHost: envVars.COMUNIDAD_HOST,
  comunidadPort: envVars.COMUNIDAD_PORT,
  jwtSecret: envVars.JWT_SECRET,
  frontendUrl: (envVars.FRONTEND_URL.startsWith('http')
    ? envVars.FRONTEND_URL
    : `https://${envVars.FRONTEND_URL}`
  ).replace(/\/$/, ''),
  authAzure: envVars.AUTH_AZURE,
  userManagementAzure: envVars.USER_MANAGEMENT_AZURE,
  protocol: envVars.AUTH_PROTOCOL,
  notificacionesAzure: envVars.NOTIFICACIONES_AZURE,
  notificacionesPort: envVars.NOTIFICACIONES_PORT,
  materialesAzure: envVars.MATERIALES_AZURE,
  materialesPort: envVars.MATERIALES_PORT,
  comunidadAzure: envVars.COMUNIDAD_AZURE,
  iaAzure: envVars.IA_AZURE,
  iaPort: envVars.IA_PORT,
  tutoriasAzure: envVars.TUTORIAS_AZURE,
  tutoriasPort: envVars.TUTORIAS_PORT,
  tutoriasHost: envVars.TUTORIAS_HOST,
};
