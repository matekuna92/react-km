// joi-val validált config

const joi = require('joi');

const myConfig = joi.object({
    PORT: joi.number().default(3005),
    LOG_LEVEL: joi.string().default('info'),
    DB_URI: joi.string().required(),
    JWT_SECRET: joi.string().required()
})
.unknown().required();

const validatedConfig = joi.attempt(process.env, myConfig);

const config = {
    port: validatedConfig.PORT,
    logLevel: validatedConfig.LOG_LEVEL,
    dbURI: validatedConfig.DB_URI,
    jwtSecret: validatedConfig.JWT_SECRET
};

module.exports = config;    // export, hogy használható legyen más fájlokban 

