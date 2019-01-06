const winston = require('winston');
const { logLevel } = require('./config');

// https://github.com/winstonjs/winston

const logger = winston.createLogger({
    level: logLevel,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.colorize(),
                winston.format.timestamp()
            )
        })
    ]
});

module.exports = logger;

      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
    //  new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //  new winston.transports.File({ filename: 'combined.log' })
    
