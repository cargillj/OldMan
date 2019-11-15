import { BotEvent, DiscordBot } from '../../../../DiscordBot'
import { EVENTS } from '../constants'
import { serverText } from '../../../utils/textStyler'

const discharge = new BotEvent({
  name: EVENTS.DISCHARGED,
  callback: () => {
    const oldMan =
      "Haha, you youngins didn't think you could get rid of me that easy, did you?"
    const server = serverText(
      `${DiscordBot.username} has regained conciousness and has headed home`
    )
    const message = `${oldMan}\n\n${server}`
    DiscordBot.say({
      to: DiscordBot.getGeneralChannel(),
      message
    })
    DiscordBot.restoreStat('hunger')
    DiscordBot.restoreStat('health')
    DiscordBot.restoreFromCache()
  }
})

export default discharge
