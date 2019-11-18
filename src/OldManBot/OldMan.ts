import OldMan from '../DiscordBot'
import { events, scheduledEvents } from './events'
import scenarios from './scenarios'
import responses from './responses'
import stats from './stats'
import * as auth from '../auth.json'
import metadata from './metadata'
import winston = require('winston')

OldMan.config({
  discordAuthToken: auth.token,
  events: [...events, ...scenarios],
  metadata,
  responses,
  scheduledEvents,
  stats
})

process.on('exit', () => OldMan.stop())
process.on('SIGINT', () => OldMan.stop())
process.on('uncaughtException', error => winston.error(error))
process.on('unhandledRejection', error => winston.error(error))
