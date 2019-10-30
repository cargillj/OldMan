import * as Discord from 'discord.io'
import * as auth from '../auth.json'
import { logger } from '../utils/Logger'

var bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.on('ready', function(evt) {
  logger.info('Connected')
  logger.info('Logged in as: %s (%d)', bot.username, bot.id)
})

export { bot }
