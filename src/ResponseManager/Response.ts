export default class Response {
  public name: string
  private trigger: RegExp
  public onTrigger: (message: string) => string
  constructor(name, trigger, onTrigger) {
    this.name = name
    this.trigger = trigger
    this.onTrigger = onTrigger
  }

  public isTriggered = phrase => (phrase.match(this.trigger) ? true : false)
}
