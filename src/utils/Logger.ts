import { createLogger, format, transports } from 'winston'
const { combine, timestamp, simple, splat, colorize, printf } = format

const customFormat = printf(({ level, message, label, timestamp }) => {
  const labelText = label ? `- [${label}] -` : ''
  return `${level}: ${timestamp} ${labelText} ${message}`
})

const logger = createLogger({
  format: combine(timestamp(), splat(), colorize(), customFormat),
  transports: [new transports.Console()]
})

export { logger }
