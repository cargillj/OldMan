import * as winston from 'winston'
const { combine, timestamp, splat, colorize, printf } = winston.format

const customFormat = printf(({ level, message, label, timestamp }) => {
  const labelText = label ? `- [${label}] -` : ''
  return `${level}: ${timestamp} ${labelText} ${message}`
})

export const configureWinston = () => {
  switch (process.env.NODE_ENV) {
    case 'TEST':
      winston.configure({
        format: combine(timestamp(), splat(), colorize(), customFormat),
        transports: [
          new winston.transports.File({
            filename: './test.log'
          })
        ]
      })
      break
    default:
      winston.configure({
        format: combine(timestamp(), splat(), colorize(), customFormat),
        transports: [new winston.transports.Console()]
      })
      break
  }
}
