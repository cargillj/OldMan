import DiscordBot from '../../../../DiscordBot'
import { EVENTS } from '../constants'
import { BotEvent } from '../../../../DiscordBot/Managers/EventManager'
import { serverText } from '../../../../utils/textStyler'

const discharge = new BotEvent({
  name: EVENTS.DISCHARGED,
  callback: () => {
    const oldMan =
      "Haha, you youngins didn't think you could get rid of me that easy, did you?"
    const server = serverText(
      `${DiscordBot.DiscordClient.username} has regained conciousness and has headed home`
    )
    const message = `${oldMan}\n\n${server}`
    DiscordBot.DiscordClient.sendMessage({
      to: DiscordBot.getGeneralChannel(),
      message
    })
    DiscordBot.StatManager.restoreStat('hunger')
    DiscordBot.StatManager.restoreStat('health')
    DiscordBot.restoreFromCache()
  }
})

export default discharge
