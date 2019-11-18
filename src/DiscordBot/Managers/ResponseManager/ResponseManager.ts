import Response from './Response'
import winston from 'winston'
import Discord from 'discord.io'

export default class ResponseManager {
  private client: Discord.Client
  private responses: Response[]
  public constructor() {
    this.responses = []
  }

  public getResponseList = () => {
    return this.responses.map(res => res.name)
  }

  public registerResponses = (responses: Response[]) => {
    this.responses = [...this.responses, ...responses]
    responses.forEach(response =>
      winston.info(`response registered: ${response.name}`)
    )
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

  public listen = client => {
    this.client = client
    this.client.on('message', async (user, userID, channelID, message, evt) => {
      const response = this.responses.find(res => res.isTriggered(message))
      const respondingToSelf = userID === this.client.id
      if (response && !respondingToSelf) {
        const responseText = await response.onTrigger(message)
        winston.info(
          `${user}: ${message} => ${this.client.username}: ${responseText}`
        )
        this.client.sendMessage({
          to: channelID,
          message: responseText
        })
      }
    })
  }
}
