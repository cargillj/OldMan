import winston from 'winston'

type ResponseOptions = {
  name: string
  trigger: RegExp
  onTrigger:
    | ((message: string) => Promise<string>)
    | ((message: string) => string)
  desc?: string
  probability?: number
}

export default class Response {
  public name: string
  private trigger: RegExp
  public onTrigger:
    | ((message: string) => Promise<string>)
    | ((message: string) => string)
  public desc: string
  private probability: number
  constructor(options: ResponseOptions) {
    this.name = options.name
    this.trigger = options.trigger
    this.onTrigger = options.onTrigger
    this.desc = options.desc || ''
    this.probability = options.probability || 100
  }

  public isRandomlyTriggered() {
    if (this.probability === 100) return true

    const randomNumber = Math.floor(Math.random() * 100)
    const isRandomlyTriggered = randomNumber <= this.probability
    winston.debug(
      '%s randomly triggered: %s (probability: %d randomNumber: %d)',
      this.name,
      isRandomlyTriggered,
      this.probability,
      randomNumber
    )
    return isRandomlyTriggered
  }

  public isTriggered(phrase) {
    const isResponseTriggered = phrase.match(this.trigger) ? true : false
    return isResponseTriggered && this.isRandomlyTriggered()
  }
}
