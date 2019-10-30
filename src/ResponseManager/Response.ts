export default class Response {
  public name: string
  private trigger: RegExp
  public onTrigger: (message: string) => string
  public desc: string
  constructor(name, trigger, onTrigger, desc = '') {
    this.name = name
    this.trigger = trigger
    this.onTrigger = onTrigger
    this.desc = desc
  }

  public isTriggered = phrase => (phrase.match(this.trigger) ? true : false)
}
