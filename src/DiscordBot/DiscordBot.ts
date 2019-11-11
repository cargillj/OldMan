import * as Discord from 'discord.io'
import moment from 'moment'
import winston from 'winston'
import { ResponseManager } from './Managers'
import { StatManager } from './Managers'

class Bot {
  // API
  public DiscordClient: Discord.Client
  public ResponseManager: ResponseManager
  public StatManager: StatManager

  public birthDate: moment.Moment
  constructor() {
    this.birthDate = moment()
    this.StatManager = new StatManager()
  }

  public connectToDiscord = discordOptions => {
    this.DiscordClient = new Discord.Client(discordOptions)
    this.ResponseManager = new ResponseManager(this.DiscordClient)
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
