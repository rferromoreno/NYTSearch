import winston from 'winston';
require('winston-daily-rotate-file');

  // logger
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.DailyRotateFile)({
    name: 'info-file',
    filename: './info-log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'info'
    }),
    new (winston.transports.DailyRotateFile)({
    name: 'error-file',
    filename: './error-log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'error'
  })
  ]
});

module.exports = logger;

