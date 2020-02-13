import CONFIG from './config';
import winston from 'winston';

export const Log = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.json()
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${CONFIG.APP_LOG_FOLDER}/error.log`,
      format: winston.format.json()
    }),
    new winston.transports.File({
      level: 'info',
      filename: `${CONFIG.APP_LOG_FOLDER}/info.log`,
      format: winston.format.json()
    })
  ]
});

export const ExpressLogger = {
  format: winston.format.json(),
  meta: true,
  colorize: false,
  expressFormat: true,
  transports: [
    new winston.transports.Console()
  ],
  dumpExceptions: true,
  showStack: true
};