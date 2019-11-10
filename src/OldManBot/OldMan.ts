import { configureWinston } from '../utils/Logger'
import OldMan from '../DiscordBot/DiscordBot'
import { responses } from './responses'
import * as auth from '../auth.json'

configureWinston()

OldMan.connectToDiscord({ token: auth.token, autorun: true })
responses.map(response => OldMan.registerResponse(response))
