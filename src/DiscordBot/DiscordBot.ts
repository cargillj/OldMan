import * as Discord from 'discord.io'
import winston from 'winston'
import { configureWinston } from './utils/Logger'
import { EventManager, ResponseManager, StatManager } from './Managers'
import { BotEvent, ScheduledEvent } from './Managers/EventManager'
import { Response } from './Managers/ResponseManager'
import { Stat } from './Managers/StatManager'

type Map = { [key: string]: any }
interface DiscordBotConfig {
  readonly discordAuthToken: string
  events?: BotEvent[]
  metadata?: Map
  responses?: Response[]
  scheduledEvents?: ScheduledEvent[]
  stats?: Stat[]
}

type sendMessageOpts = {
  to: string
  message?: string
  tts?: boolean
  nonce?: string
  typing?: boolean
}

type callbackFunc = (error: any, response: any) => void

class Bot {
  // API
  public clearResponses: () => void
  public emit: (eventName: string) => boolean
  public metadata: Map
  public printStats: () => string
  public registerEvents: (events: BotEvent[]) => void
  public registerResponses: (responses: Response[]) => void
  public restoreStat: (statName: string) => void
  public unregisterEvents: () => void
  public unscheduleEvents: () => void
  public updateStatWithDelta: (statName: string, delta: number) => void

  private DiscordClient: Discord.Client
  private EventManager: EventManager
  private ResponseManager: ResponseManager
  private StatManager: StatManager
  private cache: Map

  constructor() {
    configureWinston()
    this.createEventManager()
    this.createStatManager()
  }

  get id() {
    return this.DiscordClient.id
  }

  get username() {
    return this.DiscordClient.username
  }

  public say(options: sendMessageOpts, callback?: callbackFunc) {
    this.DiscordClient.sendMessage(options, callback)
  }

  public config(options: DiscordBotConfig) {
    const {
      discordAuthToken,
      events,
      metadata,
      responses,
      scheduledEvents,
      stats
    } = options
    this.connectToDiscord({ token: discordAuthToken, autorun: true })
    this.registerEvents(events)
    this.metadata = metadata
    this.registerResponses(responses)
    this.EventManager.scheduleEvents(scheduledEvents)
    this.StatManager.registerStats(stats)

    this.cache = { events, responses, scheduledEvents }
  }

  public getGeneralChannel() {
    let channel = Object.keys(this.DiscordClient.channels).find(
      channelId => this.DiscordClient.channels[channelId].name === 'general'
    )
    return channel || Object.keys(this.DiscordClient.channels)[0]
  }

  public restoreFromCache() {
    this.clearResponses()
    this.unregisterEvents()
    this.unscheduleEvents()
    this.registerResponses(this.cache.responses)
    this.registerEvents(this.cache.events)
    this.EventManager.scheduleEvents(this.cache.scheduledEvents)
  }

  public connectToDiscord = discordOptions => {
    this.DiscordClient = new Discord.Client(discordOptions)
    this.createResponseManager()
    this.ResponseManager.listen()
    this.DiscordClient.on('ready', evt => {
      winston.info('Bot Connected')
      winston.info(`Logged in as: ${this.username} (${this.id})`)
    })
  }

  private createResponseManager() {
    this.ResponseManager = new ResponseManager(this.DiscordClient)
    this.registerResponses = this.ResponseManager.registerResponses
    this.clearResponses = this.ResponseManager.clearResponses
  }

  private createEventManager() {
    this.EventManager = new EventManager()
    this.emit = this.EventManager.eventEmitter.emit
    this.registerEvents = this.EventManager.registerEvents
    this.unregisterEvents = this.EventManager.unregisterEvents
    this.unscheduleEvents = this.EventManager.unscheduleEvents
  }

  private createStatManager() {
    this.StatManager = new StatManager()
    this.printStats = this.StatManager.printStats
    this.restoreStat = this.StatManager.restoreStat
    this.updateStatWithDelta = this.StatManager.updateStatWithDelta
  }

  private disconnectFromDiscord = () => {
    this.DiscordClient.disconnect()
    winston.info('Bot disconnected...')
  }

  public stop = () => {
    this.clearResponses()
    this.unregisterEvents()
    this.unscheduleEvents()
    this.StatManager.clearStats()
    this.disconnectFromDiscord()
  }
}

var DiscordBot = new Bot()
export default DiscordBot
