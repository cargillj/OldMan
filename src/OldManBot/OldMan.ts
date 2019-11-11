import { configureWinston } from '../utils/Logger'
import OldMan from '../DiscordBot/DiscordBot'
import { events, scheduledEvents } from './events'
import responses from './responses'
import stats from './stats'
import * as auth from '../auth.json'

configureWinston()

OldMan.connectToDiscord({ token: auth.token, autorun: true })
OldMan.ResponseManager.registerResponses(responses)
OldMan.EventManager.registerEvents(events)
OldMan.EventManager.scheduleEvents(scheduledEvents)
OldMan.StatManager.registerStats(stats)
