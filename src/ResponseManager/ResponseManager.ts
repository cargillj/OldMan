import Response from './Response'
import winston from 'winston'
import { bot } from '../utils/Bot'

export default class ResponseManager {
  private responses: Response[]
  public constructor() {
    this.responses = []
    this.listener()
  }

  public getResponseList(): string[] {
    return this.responses.map(res => res.name)
  }

  public registerResponse = (response: Response) => {
    this.responses.push(response)
    winston.info(`response registered: ${response.name}`)
  }

  public unregisterResponse = (responseName: string) => {
    const index = this.responses.findIndex(res => res.name === responseName)
    const response = this.responses[index]
    this.responses.splice(index, 1)
    winston.info(`response unregistered: ${response.name}`)
  }

  public clearResponses = () => {
    this.responses = []
    winston.info(`responses cleared`)
  }

  public listener = () => {
    bot.on('message', async (user, userID, channelID, message, evt) => {
      const response = this.responses.find(res => res.isTriggered(message))
      const respondingToSelf = userID === bot.id
      if (response && !respondingToSelf) {
        const responseText = await response.onTrigger(message)
        winston.info(`${user}: ${message} => ${bot.username}: ${responseText}`)
        bot.say({
          to: channelID,
          message: responseText
        })
      }
    })
  }
}
