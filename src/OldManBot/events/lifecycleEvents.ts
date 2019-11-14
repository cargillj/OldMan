import { BotEvent } from '../../DiscordBot/Managers/EventManager'
import EVENTS from './constants'
import DiscordBot from '../../DiscordBot'

const missedMeal = new BotEvent({
  name: EVENTS.MISSED_MEAL,
  callback: () => DiscordBot.StatManager.updateStatWithDelta('hunger', -5)
})

const hungerPains = new BotEvent({
  name: EVENTS.HUNGER_PAINS,
  callback: () => DiscordBot.StatManager.updateStatWithDelta('health', -10)
})

const lifecycleEvents = [missedMeal, hungerPains]
export default lifecycleEvents
