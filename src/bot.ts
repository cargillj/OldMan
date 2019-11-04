import winston from 'winston'
import { configureWinston } from './utils/logger'
import { Client } from './ResponseManager'
import { bot } from './utils/Bot'
import { responses } from './responses'

configureWinston()

responses.map(response => Client.registerResponse(response))
bot.on('ready', function(evt) {
  winston.info('Bot Connected')
  winston.info(`Logged in as: ${this.username} (${this.id})`)
})
