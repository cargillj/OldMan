import { BotEvent, DiscordBot } from '../../../../DiscordBot'
import moment from 'moment'
import { EVENTS } from '../constants'
import { commands } from '../responses'
import { discharged } from '.'
import { serverText } from '../../../utils/textStyler'

const MAX_HOURS_HOSPITALIZED = 6
const MAX_TIME_UNTIL_DISCHARGE = 1000 * 60 * 60 * MAX_HOURS_HOSPITALIZED

const hospitalized = new BotEvent({
  name: EVENTS.HOSPITALIZED,
  callback: () => {
    const whiteOutResponse = `**cough, cough**, the zoomers finally got me... :skull:`
    const dayCount = moment
      .duration(moment().diff(moment(DiscordBot.metadata.birthDate)))
      .asDays()
      .toFixed(2)
    const serverStatus = serverText(
      `${DiscordBot.username} has whited out after ${dayCount} days`
    )
    const message = `${whiteOutResponse}\n${serverStatus}`
    DiscordBot.say({
      to: DiscordBot.getGeneralChannel(),
      message
    })

    DiscordBot.metadata.status = 'hospitalized'
    DiscordBot.clearResponses()
    DiscordBot.unregisterEvents()
    DiscordBot.unscheduleEvents()

    DiscordBot.registerResponses(commands)
    DiscordBot.registerEvents([discharged])

    const randomTimeUntilDischarge = Math.floor(
      Math.random() * MAX_TIME_UNTIL_DISCHARGE
    )
    setTimeout(
      () => DiscordBot.emit(EVENTS.DISCHARGED),
      randomTimeUntilDischarge
    )
  }
})

export default hospitalized
