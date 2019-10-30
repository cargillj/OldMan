import Response from './Response'
import { logger } from '../utils/Logger'
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
    logger.info(`response registered: ${response.name}`)
  }

  public unregisterResponse = (responseName: string) => {
    const index = this.responses.findIndex(res => res.name === responseName)
    const response = this.responses[index]
    this.responses.splice(index, 1)
    logger.info(`response unregistered: ${response.name}`)
  }

  public clearResponses = () => {
    this.responses = []
    logger.info(`responses cleared`)
  }

  public listener = () => {
    bot.on('message', (user, userID, channelID, message, evt) => {
      const response = this.responses.find(res => res.isTriggered(message))
      const respondingToSelf = userID === bot.id
      if (response && !respondingToSelf) {
        const responseText = response.onTrigger(message)
        logger.info(`${user}: ${message} => ${bot.username}: ${responseText}`)
        bot.sendMessage({
          to: channelID,
          message: responseText
        })
      }
    })
  }
}
