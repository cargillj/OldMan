import winston from 'winston'
import { configureWinston } from '../utils/Logger'
import { Client } from '../DiscordBot/Managers/ResponseManager'
import OldMan from '../DiscordBot/DiscordBot'
import { responses } from './responses'

configureWinston()

responses.map(response => Client.registerResponse(response))
OldMan.on('ready', function(evt) {
  winston.info('Bot Connected')
  winston.info(`Logged in as: ${this.username} (${this.id})`)
})
