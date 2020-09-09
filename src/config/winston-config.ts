import appRoot from "app-root-path";
import { Logger, transports, createLogger, format } from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");

const options = {
  file: {
    info: {
      level: "info",
      filename: `info.log.%DATE%`,
      dirname: `${appRoot}/logs`,
      json: true,
      eol: `\r\n`,
      handleException: true,
      datePattern: "YYYY-MM-DD",
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    },
    error: {
      level: "error",
      filename: `error.log.%DATE%`,
      dirname: `${appRoot}/logs`,
      json: false,
      eol: `\r\n`,
      handleException: true,
      datePattern: "YYYY-MM-DD",
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    }
  },
  console: {
    level: "debug",
    handleException: true,
    json: false,
    eol: `\r\n`,
    colorize: true
  }
};
const enumerateErrorFormat = format(info => {
  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack
      },
      info
    );
  }

  return info;
});

const requestLogger: Logger = createLogger({
  format: format.combine(enumerateErrorFormat(), format.json()),
  transports: [
    new DailyRotateFile(options.file.info),
    new transports.Console(options.console)
  ],
  exitOnError: false
});

const errorLogger: Logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(info => {
      return `${info.timestamp} [${info.level}] : ${JSON.stringify(
        info.message
      )}\r\n ${info.stack ? "Stack:" + info.stack : ""}`;
    })
  ),
  transports: [
    new DailyRotateFile(options.file.error),
    new transports.Console(options.console)
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== "production")
  requestLogger.debug("Logging initialized at debug level");

export class LoggerStream {
  write(message: string):void {
    requestLogger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}

export default errorLogger;
