import { Stat } from '../../DiscordBot/Managers/StatManager'
import DiscordBot from '../../DiscordBot'
import EVENTS from '../events/constants'

const HUNGER_START = 100
const HUNGER_MAX = 100
const HUNGER_MIN = 0
const HUNGER_LOW_THRESHOLD = 10

const maxHungerListener = (stat: Stat) => {
  if (stat.value > HUNGER_MAX) stat.value = 100
}

const minHungerListener = (stat: Stat) => {
  if (stat.value < HUNGER_MIN) {
    stat.value = 0
    DiscordBot.EventManager.eventEmitter.emit(EVENTS.HUNGER_PAINS)
  }
}

const hungerLowListener = (stat: Stat) => {
  if (stat.value <= HUNGER_LOW_THRESHOLD && stat.value !== HUNGER_MIN) {
    DiscordBot.DiscordClient.sendMessage({
      to: DiscordBot.getGeneralChannel(),
      message: `I'm getting kind of hungry... _${stat.name}: ${stat.value}_`
    })
  }
}

const hunger = new Stat({
  name: 'hunger',
  icon: ':meat_on_bone:',
  listeners: [maxHungerListener, minHungerListener, hungerLowListener],
  startVal: HUNGER_START
})

export default hunger
