import * as Discord from 'discord.io'
import moment from 'moment'
import winston from 'winston'
import { EventManager, ResponseManager, StatManager } from './Managers'
import { BotEvent, ScheduledEvent } from './Managers/EventManager'
import { Response } from './Managers/ResponseManager'
import { Stat } from './Managers/StatManager'

interface DiscordBotConfig {
  readonly discordAuthToken: string
  events?: BotEvent[]
  responses?: Response[]
  scheduledEvents?: ScheduledEvent[]
  stats?: Stat[]
}
class Bot {
  // API
  public DiscordClient: Discord.Client
  public EventManager: EventManager
  public ResponseManager: ResponseManager
  public StatManager: StatManager

  public birthDate: moment.Moment
  constructor() {
    this.birthDate = moment()
    this.EventManager = new EventManager()
    this.StatManager = new StatManager()
  }

  public config(options: DiscordBotConfig) {
    const {
      discordAuthToken,
      events,
      responses,
      scheduledEvents,
      stats
    } = options
    this.connectToDiscord({ token: discordAuthToken, autorun: true })
    this.EventManager.registerEvents(events)
    this.ResponseManager.registerResponses(responses)
    this.EventManager.scheduleEvents(scheduledEvents)
    this.StatManager.registerStats(stats)
  }

  public getGeneralChannel() {
    let channel = Object.keys(this.DiscordClient.channels).find(
      channelId => this.DiscordClient.channels[channelId].name === 'general'
    )
    return channel || Object.keys(this.DiscordClient.channels)[0]
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

  private disconnectFromDiscord = () => {
    this.DiscordClient.disconnect()
    winston.info('Bot disconnected...')
  }

  public stop = () => {
    this.ResponseManager.clearResponses()
    this.EventManager.unregisterEvents()
    this.EventManager.unscheduleEvents()
    this.StatManager.clearStats()
    this.disconnectFromDiscord()
  }
}

var DiscordBot = new Bot()
export default DiscordBot
