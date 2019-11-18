import { DiscordBot, Stat } from '../../DiscordBot'
import EVENTS from '../events/constants'

const HUNGER_START = 100
const HUNGER_MIN = 0
const HUNGER_LOW_THRESHOLD = 10

const minHungerListener = (stat: Stat) => {
  if (stat.value === HUNGER_MIN) {
    DiscordBot.emit(EVENTS.HUNGER_PAINS)
  }
}

const hungerLowListener = (stat: Stat) => {
  if (stat.value <= HUNGER_LOW_THRESHOLD && stat.value !== HUNGER_MIN) {
    DiscordBot.say({
      to: DiscordBot.getGeneralChannel(),
      message: `I'm getting kind of hungry... _${stat.name}: ${stat.value}_`
    })
  }
}

const hunger = new Stat({
  name: 'hunger',
  icon: ':meat_on_bone:',
  listeners: [minHungerListener, hungerLowListener],
  startVal: HUNGER_START
})

export default hunger
