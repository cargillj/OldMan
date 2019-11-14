import BotEvent from './BotEvents'
import { EventEmitter } from 'events'
import winston from 'winston'
import schedule from 'node-schedule'
import ScheduledEvent from './ScheduledEvents'

export default class EventManager {
  private events: { [name: string]: BotEvent }
  private scheduledEvents: { [name: string]: any }
  public eventEmitter: EventEmitter
  constructor() {
    this.events = {}
    this.scheduledEvents = {}
    this.eventEmitter = new EventEmitter()
  }

  public registerEvents = (events: BotEvent[]) => {
    events.forEach(event => {
      this.eventEmitter.on(event.name, event.callback)
      this.events[event.name] = event
      winston.info(`event registered: ${event.name}`)
    })
  }

  public getEvents = () =>
    Object.keys(this.events).map(name => this.events[name])

  public unregisterEvents = () => {
    Object.keys(this.events).forEach(name => {
      const { callback } = this.events[name]
      this.eventEmitter.removeListener(name, callback)
      delete this.events[name]
    })
    winston.info('Events unregistered...')
  }

  public scheduleEvents = (events: ScheduledEvent[]) => {
    events.forEach(event => {
      event.schedule.forEach(time => {
        this.scheduleEvents[event.name] = schedule.scheduleJob(time, () =>
          this.eventEmitter.emit(event.name)
        )
        winston.info(`${event.name} event scheduled for ${time}`)
      })
    })
  }

  public unscheduleEvents = () => {
    Object.keys(this.scheduledEvents).forEach(name => {
      this.scheduledEvents[name].forEach(scheduledEvent =>
        scheduledEvent.cancel()
      )
    })
    winston.info('Events unscheduled...')
  }
}
