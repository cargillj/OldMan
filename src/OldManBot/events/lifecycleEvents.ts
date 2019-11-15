import { BotEvent, DiscordBot } from '../../DiscordBot'
import EVENTS from './constants'

const missedMeal = new BotEvent({
  name: EVENTS.MISSED_MEAL,
  callback: () => DiscordBot.updateStatWithDelta('hunger', -5)
})

const hungerPains = new BotEvent({
  name: EVENTS.HUNGER_PAINS,
  callback: () => DiscordBot.updateStatWithDelta('health', -10)
})

const lifecycleEvents = [missedMeal, hungerPains]
export default lifecycleEvents
