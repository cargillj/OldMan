import * as Discord from 'discord.io'
import moment from 'moment'
import winston from 'winston'
import { ResponseManager } from './Managers/ResponseManager/'

class Bot {
  private ResponseManager: ResponseManager

  // API
  public DiscordClient: Discord.Client
  public registerResponse: Function

  public birthDate: moment.Moment
  constructor() {
    this.birthDate = moment()
  }

  public connectToDiscord = discordOptions => {
    this.DiscordClient = new Discord.Client(discordOptions)
    this.ResponseManager = new ResponseManager(this.DiscordClient)
    this.registerResponse = this.ResponseManager.registerResponse
    this.ResponseManager.listen()
    this.DiscordClient.on('ready', evt => {
      winston.info('Bot Connected')
      winston.info(
        `Logged in as: ${this.DiscordClient.username} (${this.DiscordClient.id})`
      )
    })
  }
}

var DiscordBot = new Bot()
export default DiscordBot
