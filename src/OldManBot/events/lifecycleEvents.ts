import { BotEvent } from '../../DiscordBot/Managers/EventManager'
import EVENTS from './constants'
import DiscordBot from '../../DiscordBot'
import moment from 'moment'

const missedMeal = new BotEvent({
  name: EVENTS.MISSED_MEAL,
  callback: () => DiscordBot.StatManager.updateStatWithDelta('hunger', -5)
})

const hungerPains = new BotEvent({
  name: EVENTS.HUNGER_PAINS,
  callback: () => DiscordBot.StatManager.updateStatWithDelta('health', -10)
})

const whiteOut = new BotEvent({
  name: EVENTS.WHITE_OUT,
  callback: () => {
    const whiteOutResponse = `**cough, cough**, the zoomers finally got me... :skull:`
    const dayCount = moment
      .duration(moment().diff(moment(DiscordBot.birthDate)))
      .asDays()
      .toFixed(2)
    const serverStatus = `> ${DiscordBot.DiscordClient.username} has whited out after ${dayCount} days.`
    const message = `${whiteOutResponse}\n\n${serverStatus}`
    DiscordBot.DiscordClient.sendMessage(
      {
        to: DiscordBot.getGeneralChannel(),
        message
      },
      () => process.exit(-1)
    )
  }
})

const lifecycleEvents = [missedMeal, hungerPains, whiteOut]
export default lifecycleEvents
