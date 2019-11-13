import { configureWinston } from '../utils/Logger'
import OldMan from '../DiscordBot/DiscordBot'
import { events, scheduledEvents } from './events'
import responses from './responses'
import stats from './stats'
import * as auth from '../auth.json'

configureWinston()
OldMan.config({
  discordAuthToken: auth.token,
  events,
  responses,
  scheduledEvents,
  stats
})

process.on('exit', () => OldMan.stop())
process.on('SIGINT', () => OldMan.stop())
