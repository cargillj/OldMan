import { configureWinston } from '../utils/Logger'
import OldMan from '../DiscordBot/DiscordBot'
import { events, scheduledEvents } from './events'
import responses from './responses'
import stats from './stats'
import * as auth from '../auth.json'

configureWinston()

OldMan.connectToDiscord({ token: auth.token, autorun: true })
responses.map(response => OldMan.ResponseManager.registerResponse(response))
stats.map(stat => OldMan.StatManager.registerStat(stat))
OldMan.EventManager.registerEvents(events)
OldMan.EventManager.scheduleEvents(scheduledEvents)
