import { Stat } from '../../DiscordBot/Managers/StatManager'
import DiscordBot from '../../DiscordBot'
import EVENTS from '../events/constants'

const HEALTH_MAX = 100
const HEALTH_MIN = 0

const maxHealthListener = (stat: Stat) => {
  if (stat.value > 100) stat.value = 100
}

const minHealthListener = (stat: Stat) => {
  if (stat.value <= HEALTH_MIN)
    DiscordBot.EventManager.eventEmitter.emit(EVENTS.WHITE_OUT)
}

const health = new Stat({
  name: 'health',
  icon: ':sparkling_heart:',
  listeners: [maxHealthListener, minHealthListener],
  startVal: HEALTH_MAX
})

export default health
