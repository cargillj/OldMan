import { Stat } from '../../DiscordBot/Managers/StatManager'
import DiscordBot from '../../DiscordBot'
import { EVENTS } from '../scenarios/hospitalized/constants'

const HEALTH_MAX = 100
const HEALTH_MIN = 0
const HEALTH_LOW_THRESHOLD = 20

const maxHealthListener = (stat: Stat) => {
  if (stat.value > 100) stat.value = 100
}

const minHealthListener = (stat: Stat) => {
  if (stat.value <= HEALTH_MIN)
    DiscordBot.EventManager.eventEmitter.emit(EVENTS.HOSPITALIZED)
}

const healthLowListener = (stat: Stat) => {
  if (stat.value <= HEALTH_LOW_THRESHOLD && stat.value !== HEALTH_MIN) {
    DiscordBot.DiscordClient.sendMessage({
      to: DiscordBot.getGeneralChannel(),
      message: `I'm finna shed my mortal coil right now, HALP! :scream:... _${stat.name}: ${stat.value}_`
    })
  }
}

const health = new Stat({
  name: 'health',
  icon: ':sparkling_heart:',
  listeners: [maxHealthListener, minHealthListener, healthLowListener],
  startVal: HEALTH_MAX
})

export default health
