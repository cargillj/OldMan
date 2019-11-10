import winston from 'winston'

type ProbabilityLevel =
  | 'never'
  | 'rarely'
  | 'sometimes'
  | 'neutral'
  | 'usually'
  | 'always'

type ResponseOptions = {
  name: string
  trigger: RegExp
  onTrigger:
    | ((message: string) => Promise<string>)
    | ((message: string) => string)
  desc?: string
  probability?: ProbabilityLevel
}

export default class Response {
  public name: string
  private trigger: RegExp
  public onTrigger:
    | ((message: string) => Promise<string>)
    | ((message: string) => string)
  public desc: string
  private probability: number

  private PROBABILITY_LEVEL = {
    never: 0,
    rarely: 20,
    sometimes: 40,
    neutral: 50,
    usually: 80,
    always: 100
  }

  constructor(options: ResponseOptions) {
    this.name = options.name
    this.trigger = options.trigger
    this.onTrigger = options.onTrigger
    this.desc = options.desc || ''
    this.probability = this.PROBABILITY_LEVEL[options.probability] || 100
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
