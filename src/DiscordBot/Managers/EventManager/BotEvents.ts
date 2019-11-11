import winston from 'winston'

type BotEventOptions = {
  callback: (stream?: any) => void
  name: string
}

export default class BotEvent {
  public callback: (stream?: any) => void
  public name: string
  constructor(options: BotEventOptions) {
    this.name = options.name
    this.callback = () => {
      options.callback()
      winston.info(`Event: ${this.name}`)
    }
  }
}
