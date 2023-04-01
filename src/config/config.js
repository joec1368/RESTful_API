import Joi from 'joi';

require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), 
  PG_PORT: Joi.number().default(5432), 
  PORT: Joi.number().default(3000),
  PG_HOST: Joi.string().default('127.0.0.1'),
  PG_USER: Joi.string(),
  PG_PASS: Joi.string(),
  PG_NAME: Joi.string(),
  VERSION: Joi.string() 
}).unknown().required();


const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  pgPort: envVars.PG_PORT,
  pgHost: envVars.PG_HOST,
  pgUserName: envVars.PG_USER,
  pgPass: envVars.PG_PASS, 
  pgDatabase: envVars.PG_DATABASE 
};

export default config; 
