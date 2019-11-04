import { Client } from './ResponseManager'
import { bot } from './utils/Bot'
import { logger } from './utils/Logger'
import { responses } from './responses'

responses.map(response => Client.registerResponse(response))
bot.on('ready', function(evt) {
  logger.info('Bot Connected')
  logger.info(`Logged in as: ${this.username} (${this.id})`)
})
