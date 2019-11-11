import Stat from './Stat'
import winston from 'winston'

export default class StatManager {
  public stats: { [statName: string]: Stat }
  constructor() {
    this.stats = {}
  }

  public registerStats = (stats: Stat[]) => {
    stats.forEach(stat => {
      this.stats[stat.name] = stat
      winston.info(`stat registered: ${stat.name}`)
    })
  }

  public getStats = () => Object.keys(this.stats).map(name => this.stats[name])

  public unregisterStat = (name: string) => delete this.stats[name]

  public clearStats = () => {
    this.stats = {}
    winston.info(`unregistered stats`)
  }

  public updateStatWithDelta = (name, delta) =>
    this.stats[name].updateWithDelta(delta)

  public printStats = () => {
    return Object.keys(this.stats).reduce(
      (acc, statName) => (acc += `${this.stats[statName].toString()}\n`),
      ''
    )
  }
}
