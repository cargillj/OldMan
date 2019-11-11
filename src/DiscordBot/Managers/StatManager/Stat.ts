type StatListener = (stat: Stat) => void

type StatOptions = {
  name: string
  icon?: string
  listeners: StatListener[]
  startVal: number
}

export default class Stat {
  public name: string
  public value: number

  private icon: string
  private listeners: StatListener[]

  constructor(options: StatOptions) {
    this.name = options.name
    this.listeners = options.listeners
    this.value = options.startVal
    this.icon = options.icon || ''
  }

  public updateWithDelta = delta => {
    this.value += delta
    this.listeners.map(listener => listener(this))
  }

  public toString = () => `${this.icon} ${this.name}: ${this.value}`
}
