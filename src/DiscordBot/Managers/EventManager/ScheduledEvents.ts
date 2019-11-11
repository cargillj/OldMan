export default class ScheduledEvent {
  public name: string
  public schedule: string[]
  constructor(name, schedule) {
    this.name = name
    this.schedule = schedule
  }
}
