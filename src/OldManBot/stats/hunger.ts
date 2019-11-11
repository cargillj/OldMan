import { Stat } from '../../DiscordBot/Managers/StatManager'
import DiscordBot from '../../DiscordBot'
import EVENTS from '../events/constants'

const HUNGER_START = 100
const HUNGER_MAX = 100
const HUNGER_MIN = 0

const maxHungerListener = (stat: Stat) => {
  if (stat.value > HUNGER_MAX) stat.value = 100
}

const minHungerListener = (stat: Stat) => {
  if (stat.value < HUNGER_MIN) {
    stat.value = 0
    DiscordBot.EventManager.eventEmitter.emit(EVENTS.HUNGER_PAINS)
  }
}

const hunger = new Stat({
  name: 'hunger',
  icon: ':meat_on_bone:',
  listeners: [maxHungerListener, minHungerListener],
  startVal: HUNGER_START
})

export default hunger
