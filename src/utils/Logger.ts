import * as winston from 'winston'
const { combine, timestamp, simple, splat, colorize, printf } = winston.format

const customFormat = printf(({ level, message, label, timestamp }) => {
  const labelText = label ? `- [${label}] -` : ''
  return `${level}: ${timestamp} ${labelText} ${message}`
})

export const configureWinston = () => {
  winston.configure({
    format: combine(timestamp(), splat(), colorize(), customFormat),
    transports: [new winston.transports.Console()]
  })
}
