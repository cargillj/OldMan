import Stat from './Stat'

export default class StatManager {
  public stats: { [statName: string]: Stat }
  constructor() {
    this.stats = {}
  }

  public registerStat = (stat: Stat) => {
    this.stats[stat.name] = stat
  }

  public getStats = () => Object.keys(this.stats).map(name => this.stats[name])

  public unregisterStat = (name: string) => delete this.stats[name]

  public updateStatWithDelta = (name, delta) =>
    this.stats[name].updateWithDelta(delta)

  public printStats = () => {
    return Object.keys(this.stats).reduce(
      (acc, statName) => (acc += `${this.stats[statName].toString()}\n`),
      ''
    )
  }
}
