type StatListener = (stat: Stat) => void

type StatOptions = {
  name: string
  icon?: string
  listeners: StatListener[]
  startVal: number
  maxVal?: number
  minVal?: number
}

const PROGRESS_FILL_CHAR = '█'
const PROGRESS_EMPTY_CHAR = '░'
const PROGRESS_BAR_SIZE = 15
const PROGRESS_PADDING = 10

export default class Stat {
  public name: string
  public value: number
  public minVal: number
  public maxVal: number

  private icon: string
  private listeners: StatListener[]

  constructor(options: StatOptions) {
    this.name = options.name
    this.listeners = options.listeners
    this.value = options.startVal
    this.icon = options.icon || ''
    this.minVal = options.minVal || 0
    this.maxVal = options.maxVal || 100
  }

  public updateWithDelta = delta => {
    this.value += delta
    this.listeners.map(listener => listener(this))
  }

  private getProgressBar = () => {
    const percentage = this.value / this.maxVal
    const progressFill = Math.floor(percentage * PROGRESS_BAR_SIZE)
    return `${this.minVal} ${PROGRESS_FILL_CHAR.repeat(
      progressFill
    )}${PROGRESS_EMPTY_CHAR.repeat(PROGRESS_BAR_SIZE - progressFill)} ${
      this.maxVal
    }`
  }

  public toString = () => {
    const label = `${this.icon}\`${this.name.padEnd(PROGRESS_PADDING)}`
    const progress = this.getProgressBar()
    return `${label} ${progress}\``
  }
}
